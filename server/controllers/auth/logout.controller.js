import { clearTokenCookie } from '../../services/auth/token.service.js';
import { successResponse } from '../../utils/response.js';

export const logoutController = (req, res, next) => {
  try {
    clearTokenCookie(res);
    return successResponse(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

/*
 * ROLE: Severs active user-sessions locally cleanly discarding sensitive connections.
 * FUNCTIONS: logoutController(req, res, next).
 * ACTIONS: Resets HTTPOnly active tokens discarding server connections completely securely mapping directly into generalized response mechanisms indicating total completion.
 * USED BY: auth.routes.js (/logout route).
 */
