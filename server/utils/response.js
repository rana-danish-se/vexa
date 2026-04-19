export const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  const payload = { success: true, message, data };
  return res.status(statusCode).json(payload);
};

export const errorResponse = (res, message, statusCode = 500, errors = null) => {
  const payload = { success: false, message };
  if (errors !== null && errors !== undefined) {
    payload.errors = errors;
  }
  return res.status(statusCode).json(payload);
};

/*
 * ROLE: Standardizes all outgoing JSON responses.
 * FUNCTIONS: successResponse(), errorResponse().
 * ACTIONS: successResponse structures the 200-range responses with data payload, errorResponse handles failure formats alongside validation errors.
 * USED BY: All controllers and error handling middle-wares across the application.
 */
