import supabase from '../../config/supabase.js';
import { NotFoundError, UnauthorizedError } from '../../utils/errors.js';

export const generateOtp = () => {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
};

export const storeOtp = async (email, otp) => {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('businesses')
    .update({ otp_code: otp, otp_expires_at: expiresAt })
    .eq('email', email)
    .select();

  if (error || !data || data.length === 0) {
    throw new NotFoundError('No account found with this email');
  }
};

export const verifyOtp = async (email, otp) => {
  const { data: business, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !business) {
    throw new NotFoundError('No account found with this email');
  }

  if (business.otp_code !== otp) {
    throw new UnauthorizedError('Invalid OTP');
  }

  if (new Date(business.otp_expires_at) < new Date()) {
    throw new UnauthorizedError('OTP has expired');
  }

  const { data: updatedBusiness, error: updateError } = await supabase
    .from('businesses')
    .update({ otp_code: null, otp_expires_at: null })
    .eq('id', business.id)
    .select()
    .single();

  if (updateError) {
    throw new Error('Failed to clean up OTP fields');
  }

  return updatedBusiness;
};

/*
 * ROLE: Core business logic surrounding the issuance, storage, and evaluation of OTP codes for 2FA/auth actions.
 * FUNCTIONS: generateOtp(), storeOtp(), verifyOtp().
 * ACTIONS: generateOtp crafts a 6-digit passcode. storeOtp writes this safely into the business's record. verifyOtp ensures it correctly matches stored active versions and scrubs the DB payload afterward.
 * USED BY: signup.controller.js, otp.controller.js.
 */
