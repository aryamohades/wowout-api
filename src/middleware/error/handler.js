const {
  UniqueViolationError,
  ValidationError
} = require('../../errors');

const errorHandlers = {};

// Handle unique constraint violation
errorHandlers.SequelizeUniqueConstraintError = () => {
  throw new UniqueViolationError();
};

// Handle validation error
errorHandlers.SequelizeValidationError = (err) => {
  const errors = err.errors.map((e) => ({
    message: e.message,
    field: e.path
  }));

  throw new ValidationError(errors);
};

module.exports = (err) => {
  const handler = errorHandlers[err.name];

  if (handler) {
    handler(err);
  }
};
