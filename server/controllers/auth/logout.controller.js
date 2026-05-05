import { clearTokenCookies } from '../../services/auth/token.service.js';
import { successResponse } from '../../utils/response.js';
import supabase from '../../config/supabase.js';

export const logoutController = async (req, res, next) => {
  try {
    if (req.business && req.business.id) {
      await supabase
        .from('businesses')
        .update({ refresh_token: null })
        .eq('id', req.business.id);
    }
    clearTokenCookies(res);
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
