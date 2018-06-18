const AppError = require('./error');

class InvalidFieldError extends AppError {
  constructor(field) {
    super(`${field} is not a valid field`, 400);
    this.type = 'InvalidFieldError';
  }
}

class MissingFieldError extends AppError {
  constructor(field) {
    super(`${field} is required`, 400);
    this.type = 'MissingFieldError';
  }
}

class UniqueViolationError extends AppError {
  constructor() {
    super('Unique constraint violation', 409);
    this.type = 'UniqueViolationError';
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super(null, 400);
    this.type = 'ValidationError';
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor() {
    super('Not found', 404);
    this.type = 'NotFoundError';
  }
}

class UnauthorizedError extends AppError {
  constructor() {
    super('Unauthorized', 401);
    this.type = 'UnauthorizedError';
  }
}

module.exports = {
  InvalidFieldError,
  MissingFieldError,
  UniqueViolationError,
  ValidationError,
  NotFoundError,
  UnauthorizedError
};
