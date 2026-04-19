import { v4 as uuidv4 } from 'uuid';

export const generateApiKey = () => {
  const uuid = uuidv4().replace(/-/g, '').substring(0, 12).toLowerCase();
  return `biz_${uuid}`;
};

/*
 * ROLE: Provides a utility mechanism for creating properly formatted chatbot API keys.
 * FUNCTIONS: generateApiKey().
 * ACTIONS: Uses UUID logic tailored securely starting with a 'biz_' prefix.
 * USED BY: Currently a scaffolding utility to be utilized heavily in phase 2 chatbot creation.
 */
