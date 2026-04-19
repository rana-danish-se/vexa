import supabase from '../config/supabase.js';
import { UnauthorizedError } from '../utils/errors.js';

export const requireApiKey = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('API key required');
    }

    const apiKey = authHeader.split(' ')[1];

    const { data: chatbot, error } = await supabase
      .from('chatbots')
      .select('*')
      .eq('api_key', apiKey)
      .single();

    if (error || !chatbot) {
      throw new UnauthorizedError('Invalid API key');
    }

    req.chatbot = chatbot;
    next();
  } catch (err) {
    next(err);
  }
};

/*
 * ROLE: Interception logic ensuring third-party SDK/widget connections transmit exact active mapping codes.
 * FUNCTIONS: requireApiKey().
 * ACTIONS: Scans incoming requests explicitly for Bearer tokens isolated via API keys rather than session tokens, and maps these specific identities out of internal routing towards their targeted chat domains.
 * USED BY: To be used in upcoming Widget / Public API routes.
 */
