const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateSignup = (body) => {
  const errors = [];
  if (!body.email || !emailRegex.test(body.email)) {
    errors.push('Valid email is required');
  }
  if (!body.password || body.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!body.name || body.name.trim() === '') {
    errors.push('Name is required');
  }
  return { valid: errors.length === 0, errors };
};

export const validateLogin = (body) => {
  const errors = [];
  if (!body.email || !emailRegex.test(body.email)) {
    errors.push('Valid email is required');
  }
  if (!body.password) {
    errors.push('Password is required');
  }
  return { valid: errors.length === 0, errors };
};

export const validateOtp = (body) => {
  const errors = [];
  if (!body.email || !emailRegex.test(body.email)) {
    errors.push('Valid email is required');
  }
  if (!body.otp || typeof body.otp !== 'string' || body.otp.length !== 6 || !/^\d{6}$/.test(body.otp)) {
    errors.push('OTP must be exactly 6 numeric characters');
  }
  return { valid: errors.length === 0, errors };
};

/*
 * ROLE: Ensures validation for incoming requests regarding authentication prior to controller routing.
 * FUNCTIONS: validateSignup(), validateLogin(), validateOtp().
 * ACTIONS: Checks bodies for criteria like email semantics, password lengths, or numerical strictness for tokens, outputting error groupings if absent.
 * USED BY: signup.controller.js, login.controller.js, otp.controller.js.
 */
