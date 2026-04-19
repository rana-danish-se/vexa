import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import supabase from '../../config/supabase.js';

const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const name = profile.displayName;
          const google_id = profile.id;

          const { data: existingBusiness, error: fetchError } = await supabase
            .from('businesses')
            .select('*')
            .eq('email', email)
            .maybeSingle();

          if (fetchError) {
            return done(fetchError, null);
          }

          if (existingBusiness) {
            if (existingBusiness.google_id) {
              return done(null, existingBusiness);
            } else {
              const { data: updatedBusiness, error: updateError } = await supabase
                .from('businesses')
                .update({ google_id })
                .eq('id', existingBusiness.id)
                .select()
                .single();

              if (updateError) {
                return done(updateError, null);
              }
              return done(null, updatedBusiness);
            }
          } else {
            const { data: newBusiness, error: createError } = await supabase
              .from('businesses')
              .insert({
                email,
                name,
                google_id,
                plan: 'free',
                is_verified: true,
              })
              .select()
              .single();

            if (createError) {
              return done(createError, null);
            }
            return done(null, newBusiness);
          }
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { data: business, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return done(error, null);
      }
      done(null, business);
    } catch (error) {
      done(error, null);
    }
  });
};

configureGoogleStrategy();

export default passport;

/*
 * ROLE: Setup, configure, and operate the Passport.JS strategy dealing with Google OAuth2 endpoints.
 * FUNCTIONS: configureGoogleStrategy().
 * ACTIONS: Injects mapping logic determining whether users registering initially using Google should generate a unique business identity or if they represent an active account looking to cross-link via email.
 * USED BY: google.controller.js and app.js initialization.
 */
