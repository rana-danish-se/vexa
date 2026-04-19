import { validateSignup } from '../../validations/auth.validation.js';
import supabase from '../../config/supabase.js';
import bcrypt from 'bcryptjs';
import { sendOtpEmail } from '../../services/email/mailer.service.js';
import { generateOtp, storeOtp } from '../../services/auth/otp.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';
import { ConflictError } from '../../utils/errors.js';

export const signupController = async (req, res, next) => {
  try {
    const { valid, errors } = validateSignup(req.body);
    if (!valid) {
      return errorResponse(res, 'Validation failed', 400, errors);
    }

    const { email, password, name } = req.body;

    const { data: existingBusiness } = await supabase
      .from('businesses')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingBusiness) {
      throw new ConflictError('An account with this email already exists.');
    }

    const password_hash = await bcrypt.hash(password, 12);

    const { data: newBusiness, error: insertError } = await supabase
      .from('businesses')
      .insert({
        email,
        name,
        password_hash,
        plan: 'free',
        is_verified: false,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    const otp = generateOtp();
    await storeOtp(email, otp);
    await sendOtpEmail(email, otp);

    return successResponse(
      res,
      { email },
      'Account created. Please verify your email with the OTP sent.',
      201
    );
  } catch (error) {
    next(error);
  }
};

/*
 * ROLE: Executes initial account creation and triggers verification workflows.
 * FUNCTIONS: signupController(req, res, next).
 * ACTIONS: Validates email formatting, queries existing identifiers, hashes raw passwords natively via bcrypt, commits the user state, then triggers immediate verification email queues.
 * USED BY: auth.routes.js (/signup route).
 */
