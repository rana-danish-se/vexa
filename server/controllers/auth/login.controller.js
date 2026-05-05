import { validateLogin } from '../../validations/auth.validation.js';
import supabase from '../../config/supabase.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, attachTokenCookies } from '../../services/auth/token.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';
import { UnauthorizedError } from '../../utils/errors.js';

export const loginController = async (req, res, next) => {
  try {
    const { valid, errors } = validateLogin(req.body);
    if (!valid) {
      return errorResponse(res, 'Validation failed', 400, errors);
    }

    const { email, password } = req.body;

    const { data: business } = await supabase
      .from('businesses')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (!business) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    if (!business.is_verified) {
      throw new UnauthorizedError('Please verify your email before logging in.');
    }

    if (!business.password_hash) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(password, business.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    const accessToken = generateAccessToken({
      id: business.id,
      email: business.email,
      plan: business.plan,
    });

    const refreshToken = generateRefreshToken({ id: business.id });

    // Store refresh token in database
    await supabase
      .from('businesses')
      .update({ refresh_token: refreshToken })
      .eq('id', business.id);

    attachTokenCookies(res, accessToken, refreshToken);

    return successResponse(
      res,
      {
        id: business.id,
        email: business.email,
        name: business.name,
        plan: business.plan,
      },
      'Logged in successfully'
    );
  } catch (error) {
    next(error);
  }
};

/*
 * ROLE: Directs inbound user logins mapping native email configurations.
 * FUNCTIONS: loginController(req, res, next).
 * ACTIONS: Reads database objects mapping isolated hashes directly to bcrypt evaluators ensuring validity without exposing sensitive outputs; automatically handles returning HTTP tokens inside isolated secure domains bridging native sessions.
 * USED BY: auth.routes.js (/login route).
 */
