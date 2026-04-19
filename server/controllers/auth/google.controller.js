import passport from 'passport';
import { generateToken, attachTokenCookie } from '../../services/auth/token.service.js';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = [
  passport.authenticate('google', {
    session: false,
    failureRedirect: process.env.CLIENT_URL + '/login?error=google_failed',
  }),
  (req, res) => {
    const business = req.user;
    
    const token = generateToken({
      id: business.id,
      email: business.email,
      plan: business.plan,
    });

    attachTokenCookie(res, token);

    res.redirect(process.env.CLIENT_URL + '/dashboard');
  }
];

/*
 * ROLE: Intermediary executing Passport integrations tied seamlessly towards Google's authentication mechanisms.
 * FUNCTIONS: googleAuth(req, res, next), googleCallback(Array of middlewares including req/res block).
 * ACTIONS: Maps immediate outbound redirection parameters starting secure workflows via scope targeting, automatically captures incoming validated identities immediately returning users backward internally coupled correctly natively tokenized.
 * USED BY: auth.routes.js (/google and /google/callback routes).
 */
