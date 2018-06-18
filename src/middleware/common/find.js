const { success } = require('../../response');

const {
  ValidationError,
  MissingFieldError,
  NotFoundError
} = require('../../errors');

const getValues = (req, fields) => {
  if (!fields) {
    return {};
  }

  const errors = [];
  const values = {};

  Object.keys(fields).forEach((field) => {
    let val;

    const {
      value,
      user,
      params,
      body,
      search,
      as,
      validate,
      optional,
      defaultValue
    } = fields[field];

    if (value) {
      val = value;
    } else if (user) {
      val = req.user[field];
    } else if (params) {
      val = req.params[field];
    } else if (body) {
      val = req.body[field];
    } else if (search) {
      val = req.query[field];
    }

    val = val || defaultValue;

    if (val === undefined) {
      if (!optional) {
        throw new MissingFieldError(field);
      } else {
        return;
      }
    }

    if (as) {
      values[as] = val;
    } else {
      values[field] = val;
    }

    if (validate) {
      let isValid = true;

      if (typeof validate === 'function' && !validate(val)) {
        isValid = false;
      } else if (validate.fn && !validate.fn(val)) {
        isValid = false;
      }

      if (!isValid) {
        const message = validate.message
          ? validate.message
          : `field ${field} failed validation`;

        errors.push({
          field: field,
          message: message
        });
      }
    }
  });

  return {
    values,
    errors
  };
};

module.exports = (config) => {
  const {
    model,
    method,
    name,
    from,
    query,
    attributes,
    include,
    filter,
    order,
    includeIgnoreAttributes,
    limit,
    response,
    serialize
  } = config;

  return async (req, res, next) => {
    let values;
    let errors;

    if (filter && req.query[filter.param] === undefined) {
      return next();
    }

    try {
      ({ values, errors } = getValues(req, query));
    } catch (err) {
      return next(err);
    }

    const q = {
      where: values,
      include,
      order,
      attributes,
      includeIgnoreAttributes
    };

    if (filter) {
      const filterValue = req.query[filter.param];

      if (filter.validate && !filter.validate(filterValue)) {
        return next();
      }

      q.include = [
        ...q.include,
        {
          model: filter.model,
          as: filter.as,
          attributes: filter.attributes || [],
          where: {
            [filter.field || filter.param]: filterValue
          }
        }
      ];
    }

    try {
      if (errors && errors.length > 0) {
        throw new ValidationError(errors);
      }
    } catch (err) {
      return next(err);
    }

    if (limit) {
      const { min, max, defaultValue } = limit;

      let queryLimit = Number(req.query.limit);

      if (Number.isInteger(queryLimit)) {
        if (queryLimit < 0 || queryLimit < min || queryLimit > max) {
          queryLimit = defaultValue;
        }
      } else {
        queryLimit = defaultValue;
      }

      q.limit = queryLimit;
    }

    try {
      let instance;

      if (from) {
        if (from.model) {
          if (req.query[from.param] === undefined) {
            if (from.required) {
              throw new MissingFieldError(from.param);
            }

            return next();
          }

          if (from.validate) {
            if (!from.validate(req.query[from.param])) {
              throw new NotFoundError();
            }
          }

          const fromInstance = await from.model.findOne({
            attributes: ['id'],
            where: {
              [from.findBy]: req.query[from.param]
            }
          });

          if (!fromInstance) {
            throw new NotFoundError();
          }

          instance = await fromInstance[from.method](q);
        } else {
          instance = await req[from.instance][from.method](q);
        }
      } else {
        instance = await model[method || 'findAll'](q);
      }

      if (instance) {
        if (response) {
          const responseData = serialize
            ? serialize(instance)
            : { [name]: model.json(instance) };

          success(res, {
            data: {
              ...responseData
            }
          });
        } else {
          req[name] = instance;
          next();
        }
      } else if (!instance && method === 'findOne') {
        throw new NotFoundError();
      }
    } catch (err) {
      next(err);
    }
  };
};
