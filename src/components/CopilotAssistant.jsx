import { useState } from 'react';
import { supplementDatabase } from '../data/supplementDatabase';
import openai from '../config/openai';

function CopilotAssistant({ userGoals, experience, currentWorkout, recommendations, selectedSupplements }) {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      message: "Hi! I'm your AI Supplement Copilot powered by OpenAI. I can help you understand FDA-compliant supplement recommendations, answer questions about timing, dosages, interactions, and create personalized supplement plans based on your workout goals. What would you like to know?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const predefinedQuestions = [
    "What supplements should I take as a beginner?",
    "Explain the FDA compliance of my recommendations",
    "When should I take each supplement?",
    "Are there any interactions I should know about?",
    "What's the science behind creatine?",
    "How do I maximize recovery?"
  ];

  const buildSystemPrompt = () => {
    const goalText = userGoals.length > 0 ? userGoals.join(', ') : 'general fitness';
    const workoutInfo = currentWorkout 
      ? `\nCurrent workout: ${currentWorkout.name} with ${currentWorkout.exercises.length} exercises focusing on ${currentWorkout.exercises.map(e => e.name).join(', ')}`
      : '';
    
    const recommendedSupps = recommendations.map(supp => 
      `- ${supp.name}: ${supp.category}, FDA Status: ${supp.compliance.status}, Source: ${supp.compliance.source}`
    ).join('\n');

    return `You are an expert AI supplement advisor specializing in FDA-compliant, evidence-based supplement recommendations for fitness and health.

USER PROFILE:
- Experience Level: ${experience}
- Fitness Goals: ${goalText}${workoutInfo}

CURRENT RECOMMENDATIONS:
${recommendedSupps || 'No recommendations yet'}

IMPORTANT GUIDELINES:
1. Only recommend supplements that are FDA-compliant (GRAS status or DSHEA compliant)
2. Always cite FDA regulatory status when discussing supplements
3. Provide evidence-based information with scientific backing
4. Include safety warnings and remind users to consult healthcare providers
5. Focus on these FDA-compliant supplements from our database:
   - Proteins: Whey Protein Isolate (GRAS GRN 000037), Casein (GRAS GRN 000397)
   - Performance: Creatine Monohydrate (DSHEA compliant), Beta-Alanine (NDI 576), Caffeine (FDA 21 CFR 182.1180)
   - Recovery: L-Glutamine (GRAS GRN 000030), BCAAs (GRAS GRN 000458-460)
   - Vitamins/Minerals: Vitamin D3 (FDA 21 CFR 184.1950), Omega-3 (GRAS GRN 000105), Magnesium (FDA 21 CFR 184.1443)
6. Explain timing, dosage, and potential interactions when relevant
7. Be helpful, specific, and practical in recommendations
8. If asked about non-compliant or potentially harmful substances, explain why they're not recommended

Provide concise, actionable advice while maintaining scientific accuracy and regulatory compliance.`;
  };

  const generateResponse = async (question) => {
    try {
      setIsLoading(true);
      setError('');

      if (!openai) {
        setError('Please set your OpenAI API key in the .env file (VITE_OPENAI_API_KEY)');
        return 'API key not configured. Please add your OpenAI API key to use the AI copilot. In the meantime, here are some general recommendations:\n\n' + getFallbackResponse(question);
      }

      const messages = [
        { role: 'system', content: buildSystemPrompt() },
        ...chatHistory.slice(1).map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.message
        })),
        { role: 'user', content: question }
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      return completion.choices[0].message.content;
    } catch (err) {
      console.error('OpenAI API Error:', err);
      
      // Fallback responses for common errors
      if (err.message?.includes('API key')) {
        setError('Please set your OpenAI API key in the .env file (VITE_OPENAI_API_KEY)');
        return 'API key not configured. Please add your OpenAI API key to use the AI copilot. In the meantime, here are some general recommendations:\n\n' + getFallbackResponse(question);
      } else if (err.message?.includes('rate limit')) {
        setError('Rate limit reached. Please try again in a moment.');
        return 'Rate limit reached. Please try again in a moment.';
      } else {
        setError('Unable to connect to AI service. Using offline mode.');
        return getFallbackResponse(question);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('beginner')) {
      return `For beginners, I recommend:
• Whey Protein: 25-30g post-workout (FDA GRAS approved)
• Magnesium: 200-400mg before bed (FDA compliant)
Start with these basics before adding more supplements.`;
    }
    
    if (lowerQuestion.includes('fda') || lowerQuestion.includes('compliance')) {
      return `All recommended supplements are FDA-compliant:
• GRAS Status: Whey, Casein, Caffeine, Vitamins
• DSHEA Compliant: Creatine, Beta-Alanine, L-Citrulline
Each has specific FDA citations available in the details view.`;
    }
    
    if (lowerQuestion.includes('creatine')) {
      return `Creatine Monohydrate:
• Most studied supplement (1000+ studies)
• 5g daily dosage
• FDA Status: DSHEA compliant dietary supplement
• Proven for strength and muscle gains`;
    }
    
    return `Based on your ${experience} experience level and goals, check the recommendations above. Each supplement includes FDA compliance information and dosage guidelines.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage = { role: 'user', message: query };
    setChatHistory(prev => [...prev, userMessage]);
    setQuery('');

    const response = await generateResponse(query);
    const aiResponse = { role: 'assistant', message: response };
    setChatHistory(prev => [...prev, aiResponse]);
  };

  const handleQuickQuestion = async (question) => {
    if (isLoading) return;
    
    const userMessage = { role: 'user', message: question };
    setChatHistory(prev => [...prev, userMessage]);

    const response = await generateResponse(question);
    const aiResponse = { role: 'assistant', message: response };
    setChatHistory(prev => [...prev, aiResponse]);
  };

  return (
    <div className="space-y-4">
      {/* API Status */}
      {error && (
        <div className="bg-red-500/20 text-white p-3 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Chat History */}
      <div className="bg-white/10 rounded-lg p-4 max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-white text-gray-900' 
                  : 'bg-white/20 text-white'
              }`}>
                <p className="text-xs font-medium mb-1 opacity-70">
                  {msg.role === 'user' ? 'You' : '🤖 AI Copilot'}
                </p>
                <div className="text-sm whitespace-pre-wrap">{msg.message}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/20 text-white p-3 rounded-lg">
                <p className="text-xs font-medium mb-1 opacity-70">🤖 AI Copilot</p>
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2">
        {predefinedQuestions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickQuestion(question)}
            disabled={isLoading}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs text-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about supplements, timing, FDA compliance..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-white/20 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '...' : 'Ask'}
        </button>
      </form>

      {/* Info Box */}
      <div className="bg-white/10 rounded-lg p-3">
        <p className="text-xs text-white/80">
          💡 <strong>Powered by OpenAI GPT-3.5</strong> • All recommendations are based on FDA-compliant supplements only
        </p>
        <p className="text-xs text-white/60 mt-1">
          ⚠️ Always consult a healthcare provider before starting any supplement regimen
        </p>
      </div>

      {/* API Key Setup Instructions */}
      {!import.meta.env.VITE_OPENAI_API_KEY && (
        <div className="bg-yellow-500/20 text-white p-3 rounded-lg text-xs">
          <strong>Setup Required:</strong>
          <ol className="mt-1 ml-4 list-decimal">
            <li>Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" className="underline">OpenAI Platform</a></li>
            <li>Create a .env file in the project root</li>
            <li>Add: VITE_OPENAI_API_KEY=your_key_here</li>
            <li>Restart the development server</li>
          </ol>
        </div>
      )}
    </div>
  );
}

export default CopilotAssistant;