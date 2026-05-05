import { generateAccessToken, verifyRefreshToken, attachTokenCookies } from '../../services/auth/token.service.js';
import supabase from '../../config/supabase.js';
import { UnauthorizedError } from '../../utils/errors.js';
import { successResponse } from '../../utils/response.js';

export const refreshTokenController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies[process.env.REFRESH_COOKIE_NAME];
    
    if (!refreshToken) {
      throw new UnauthorizedError('Authentication required');
    }

    const { id } = verifyRefreshToken(refreshToken);

    const { data: business } = await supabase
      .from('businesses')
      .select('id, email, plan, refresh_token')
      .eq('id', id)
      .single();

    if (!business || business.refresh_token !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token.');
    }

    const accessToken = generateAccessToken({
      id: business.id,
      email: business.email,
      plan: business.plan,
    });

    attachTokenCookies(res, accessToken); // Only attaches access token since refreshToken is omitted

    return successResponse(res, null, 'Token refreshed');
  } catch (error) {
    next(error);
  }
};

/*
 * ROLE: Intercepts expired active tokens and natively refreshes access cookies securely using backend-stored refresh tokens.
 * FUNCTIONS: refreshTokenController(req, res, next).
 * ACTIONS: Cross-references cookie-provided Refresh variables with Supabase, validating identities and seamlessly returning newly initialized Access tokens natively extending session lifetimes silently.
 * USED BY: auth.routes.js (/refresh route).
 */
