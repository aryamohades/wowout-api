const { success } = require('../../response');

module.exports = (config) => {
  const {
    model,
    name,
    response,
    serialize
  } = config;

  return async (req, res, next) => {
    const instance = await model.create(req.body).catch(next);

    if (instance) {
      req[name] = instance;

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
        next();
      }
    }
  };
};
