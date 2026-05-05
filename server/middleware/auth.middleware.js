import { verifyAccessToken } from '../services/auth/token.service.js';
import { UnauthorizedError } from '../utils/errors.js';

export const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies[process.env.ACCESS_COOKIE_NAME];
    
    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    const decoded = verifyAccessToken(token);
    req.business = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

/*
 * ROLE: Interception logic verifying HttpOnly browser cookies map directly to active logged-in identities.
 * FUNCTIONS: requireAuth().
 * ACTIONS: Reads HTTP constraints isolating token contents, parsing them using secret validations, before attaching the proven credential schema directly alongside outgoing request headers acting against protected endpoints.
 * USED BY: auth.routes.js (Protecting routes like /logout and /me).
 */
