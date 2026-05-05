const required = [
  'PORT',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'ACCESS_TOKEN_SECRET',
  'ACCESS_TOKEN_EXPIRES_IN',
  'REFRESH_TOKEN_SECRET',
  'REFRESH_TOKEN_EXPIRES_IN',
  'ACCESS_COOKIE_NAME',
  'REFRESH_COOKIE_NAME',
  'ACCESS_COOKIE_MAX_AGE',
  'REFRESH_COOKIE_MAX_AGE',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALLBACK_URL',
  'SESSION_SECRET',
  'NODEMAILER_HOST',
  'NODEMAILER_PORT',
  'NODEMAILER_USER',
  'NODEMAILER_PASS',
  'CLIENT_URL',
];

const missing = [];
for (const key of required) {
  if (!process.env[key]) {
    missing.push(key);
  }
}

if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

/*
 * ROLE: Validates that all required environment variables are present at startup.
 * FUNCTIONS: None (runs side-effects on import).
 * ACTIONS: Iterates through required array, checks process.env, and throws Error if any are missing.
 * USED BY: server.js
 */
