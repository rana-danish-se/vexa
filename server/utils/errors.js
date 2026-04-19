export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message) {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(message) {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

export class InternalError extends AppError {
  constructor(message) {
    super(message, 500);
    this.name = 'InternalError';
  }
}

/*
 * ROLE: Defines strict custom error classes.
 * FUNCTIONS: AppError, ValidationError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, RateLimitError, InternalError classes.
 * ACTIONS: Groups specific HTTP status codes mapped to descriptive Error types.
 * USED BY: app.js, middlewares, controllers, and services.
 */
