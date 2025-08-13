import OpenAI from 'openai';

// Initialize OpenAI client only if API key exists
// You need to set your API key in environment variable VITE_OPENAI_API_KEY
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: In production, make API calls from backend
}) : null;

export default openai;