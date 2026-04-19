import express from 'express';
import { signupController } from '../controllers/auth/signup.controller.js';
import { loginController } from '../controllers/auth/login.controller.js';
import { verifyOtpController, resendOtpController } from '../controllers/auth/otp.controller.js';
import { logoutController } from '../controllers/auth/logout.controller.js';
import { googleAuth, googleCallback } from '../controllers/auth/google.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { loginRateLimit, otpRateLimit } from '../middleware/rateLimit.middleware.js';
import supabase from '../config/supabase.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginRateLimit, loginController);
router.post('/verify-otp', verifyOtpController);
router.post('/resend-otp', otpRateLimit, resendOtpController);
router.post('/logout', requireAuth, logoutController);

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { data: business, error } = await supabase
      .from('businesses')
      .select('id, email, name, plan')
      .eq('id', req.business.id)
      .single();

    if (error || !business) {
        return errorResponse(res, 'Account not found', 404);
    }

    return successResponse(res, business, 'Fetched profile successfully');
  } catch (error) {
    next(error);
  }
});

export default router;

/*
 * ROLE: Constructs entirely mapped express routing blocks dictating traffic handling explicitly around authentication resources.
 * FUNCTIONS: None natively crafted (exports standard Express Router combining imported entities).
 * ACTIONS: Interconnects defined controllers alongside distinct middle-ware logic blocks isolating sensitive actions behind explicit login verification dependencies specifically isolating /me operations immediately inline mapping data returns accurately dynamically without redundant overheads.
 * USED BY: app.js.
 */
