import crypto from 'crypto';

/**
 * Generates a unique, secure API key for a chatbot.
 * Format: vexa_[random_hex_string]
 * Length of random hex string is 32 characters (16 bytes).
 */
export const generateApiKey = () => {
  const randomBytes = crypto.randomBytes(16).toString('hex');
  return `vexa_${randomBytes}`;
};
