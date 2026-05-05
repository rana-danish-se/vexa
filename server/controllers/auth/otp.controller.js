import { validateOtp } from '../../validations/auth.validation.js';
import { generateOtp, storeOtp, verifyOtp } from '../../services/auth/otp.service.js';
import { sendOtpEmail } from '../../services/email/mailer.service.js';
import { generateAccessToken, generateRefreshToken, attachTokenCookies } from '../../services/auth/token.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';
import { NotFoundError } from '../../utils/errors.js';
import supabase from '../../config/supabase.js';

export const verifyOtpController = async (req, res, next) => {
  try {
    const { valid, errors } = validateOtp(req.body);
    if (!valid) {
      return errorResponse(res, 'Validation failed', 400, errors);
    }

    const { email, otp } = req.body;
    const business = await verifyOtp(email, otp);

    const { data: updatedBusiness, error: updateError } = await supabase
      .from('businesses')
      .update({ is_verified: true })
      .eq('id', business.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    const accessToken = generateAccessToken({
      id: updatedBusiness.id,
      email: updatedBusiness.email,
      plan: updatedBusiness.plan,
    });

    const refreshToken = generateRefreshToken({ id: updatedBusiness.id });

    // Store refresh token in database
    await supabase
      .from('businesses')
      .update({ refresh_token: refreshToken })
      .eq('id', updatedBusiness.id);

    attachTokenCookies(res, accessToken, refreshToken);

    return successResponse(
      res,
      {
        id: updatedBusiness.id,
        email: updatedBusiness.email,
        name: updatedBusiness.name,
        plan: updatedBusiness.plan,
      },
      'Email verified successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const resendOtpController = async (req, res, next) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email } = req.body;

    if (!email || !emailRegex.test(email)) {
      return errorResponse(res, 'Valid email is required', 400);
    }

    const { data: business, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error || !business) {
      throw new NotFoundError('No account found with this email.');
    }

    if (business.is_verified) {
      return errorResponse(res, 'This account is already verified.', 400);
    }

    const otp = generateOtp();
    await storeOtp(email, otp);
    await sendOtpEmail(email, otp);

    return successResponse(res, null, 'A new OTP has been sent to your email.');
  } catch (error) {
    next(error);
  }
};

/*
 * ROLE: Handles OTP inputs directly from user sessions attempting to unblock registration flows or request duplicates.
 * FUNCTIONS: verifyOtpController(req, res, next), resendOtpController(req, res, next).
 * ACTIONS: Verifies user tokens logic tying back to email accounts directly, activating the specific account profile upon success and writing immediate login token/cookies, additionally featuring logic for dispatching an identical refreshed code if initial attempts fail contextually.
 * USED BY: auth.routes.js (/verify-otp and /resend-otp routes).
 */
