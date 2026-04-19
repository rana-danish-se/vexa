import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default supabase;

/*
 * ROLE: Initializes and exports a single Supabase client for database operations.
 * FUNCTIONS: None natively defined (exports the initialized client).
 * ACTIONS: Configures the Supabase client utilizing the service role key to bypass row-level security.
 * USED BY: All services and controllers that need database context (e.g., otp.service.js, google.service.js).
 */
