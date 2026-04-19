import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../utils/errors.js';

export const generateToken = (payload) => {
  return jwt.sign(
    { id: payload.id, email: payload.email, plan: payload.plan },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired session');
  }
};

export const attachTokenCookie = (res, token) => {
  res.cookie(process.env.COOKIE_NAME, token, {
    maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};

export const clearTokenCookie = (res) => {
  res.cookie(process.env.COOKIE_NAME, '', {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};

/*
 * ROLE: Manage JWT manipulation alongside the lifecycle of secure browser tokens mapping to those JWTs.
 * FUNCTIONS: generateToken(), verifyToken(), attachTokenCookie(), clearTokenCookie().
 * ACTIONS: Mints signed configurations verifying user session lifecycles, and binds these directly into httpOnly browser cookies, or deliberately clears them representing logouts.
 * USED BY: login.controller.js, otp.controller.js, google.controller.js, logout.controller.js, and auth.middleware.js.
 */
