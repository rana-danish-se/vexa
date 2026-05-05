import passport from 'passport';
import { generateAccessToken, generateRefreshToken, attachTokenCookies } from '../../services/auth/token.service.js';
import supabase from '../../config/supabase.js'; // Added missing import for supabase

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = [
  passport.authenticate('google', {
    session: false,
    failureRedirect: process.env.CLIENT_URL + '/login?error=google_failed',
  }),
  async (req, res) => { // Made this callback async
    const business = req.user;
    
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

    res.redirect(process.env.CLIENT_URL + '/dashboard');
  }
];

/*
 * ROLE: Intermediary executing Passport integrations tied seamlessly towards Google's authentication mechanisms.
 * FUNCTIONS: googleAuth(req, res, next), googleCallback(Array of middlewares including req/res block).
 * ACTIONS: Maps immediate outbound redirection parameters starting secure workflows via scope targeting, automatically captures incoming validated identities immediately returning users backward internally coupled correctly natively tokenized.
 * USED BY: auth.routes.js (/google and /google/callback routes).
 */
