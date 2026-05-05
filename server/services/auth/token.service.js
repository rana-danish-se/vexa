import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../utils/errors.js';

export const generateAccessToken = (payload) => {
  return jwt.sign(
    { id: payload.id, email: payload.email, plan: payload.plan },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(
    { id: payload.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }
};

export const attachTokenCookies = (res, accessToken, refreshToken) => {
  const isProd = process.env.NODE_ENV === 'production';
  
  res.cookie(process.env.ACCESS_COOKIE_NAME, accessToken, {
    maxAge: parseInt(process.env.ACCESS_COOKIE_MAX_AGE, 10),
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
  });

  if (refreshToken) {
    res.cookie(process.env.REFRESH_COOKIE_NAME, refreshToken, {
      maxAge: parseInt(process.env.REFRESH_COOKIE_MAX_AGE, 10),
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
    });
  }
};

export const clearTokenCookies = (res) => {
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie(process.env.ACCESS_COOKIE_NAME, '', {
    maxAge: 0,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
  });

  res.cookie(process.env.REFRESH_COOKIE_NAME, '', {
    maxAge: 0,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
  });
};

/*
 * ROLE: Manage JWT manipulation alongside the lifecycle of secure browser dual-tokens mapping to those JWTs.
 * FUNCTIONS: generateAccessToken(), generateRefreshToken(), verifyAccessToken(), verifyRefreshToken(), attachTokenCookies(), clearTokenCookies().
 * ACTIONS: Mints signed access and refresh configurations verifying user session lifecycles, and binds these directly into httpOnly browser cookies, or deliberately clears them representing logouts.
 * USED BY: login.controller.js, otp.controller.js, google.controller.js, logout.controller.js, refresh.controller.js, and auth.middleware.js.
 */
