import supabase from '../../config/supabase.js';
import { generateApiKey } from '../../utils/apiKey.js';
import { errorResponse, successResponse } from '../../utils/response.js';

/**
 * @desc    Create a new chatbot
 * @route   POST /api/chatbots
 * @access  Private
 */
export const createChatbot = async (req, res, next) => {
  try {
    const { name, personality, greeting, fallback, widget_color, widget_position } = req.body;

    // Validate required fields
    if (!name) {
      return errorResponse(res, 'Chatbot name is required', 400);
    }

    // Prepare data
    const newChatbotData = {
      business_id: req.business.id,
      name,
      personality: personality || 'friendly',
      greeting: greeting || 'Hi! How can I help you today?',
      fallback: fallback || 'I am not sure about that. Would you like to speak with a human?',
      widget_color: widget_color || '#1D9E75',
      widget_position: widget_position || 'bottom-right',
      api_key: generateApiKey(),
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('chatbots')
      .insert([newChatbotData])
      .select()
      .single();

    if (error) {
      console.error('[Supabase Insert Error]:', error);
      return errorResponse(res, 'Failed to create chatbot. Please try again.', 500);
    }

    return successResponse(res, 'Chatbot created successfully', data, 201);
  } catch (err) {
    next(err);
  }
};
