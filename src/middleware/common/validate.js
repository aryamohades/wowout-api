const { InvalidFieldError } = require('../../errors');

module.exports = (config) => {
  const { fields } = config;

  return (req, res, next) => {
    Object.keys(req.body).forEach((field) => {
      try {
        if (fields[field] === undefined) {
          throw new InvalidFieldError(field);
        }
      } catch (err) {
        next(err);
      }
    });

    next();
  };
};
