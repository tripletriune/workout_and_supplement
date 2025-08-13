import { useState, useEffect } from 'react';
import { supplementDatabase, getSupplementById } from '../data/supplementDatabase';
import CopilotAssistant from './CopilotAssistant';

function SupplementCopilot({ workouts, currentWorkout }) {
  const [userGoals, setUserGoals] = useState([]);
  const [experience, setExperience] = useState('beginner');
  const [recommendations, setRecommendations] = useState([]);
  const [selectedSupplements, setSelectedSupplements] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [showCopilot, setShowCopilot] = useState(false);

  const goals = [
    { id: 'muscle-growth', name: 'Muscle Growth', icon: '💪' },
    { id: 'strength', name: 'Strength Gains', icon: '🏋️' },
    { id: 'endurance', name: 'Endurance', icon: '🏃' },
    { id: 'recovery', name: 'Recovery', icon: '🔄' },
    { id: 'weight-loss', name: 'Weight Loss', icon: '⚖️' },
    { id: 'general-health', name: 'General Health', icon: '❤️' }
  ];

  const analyzeWorkout = (workout) => {
    if (!workout) return { type: 'general', intensity: 'moderate' };
    
    const exerciseCount = workout.exercises.length;
    const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const avgReps = workout.exercises.reduce((sum, ex) => sum + ex.reps, 0) / exerciseCount;
    
    let type = 'general';
    if (avgReps <= 6) type = 'strength';
    else if (avgReps <= 12) type = 'hypertrophy';
    else type = 'endurance';
    
    let intensity = 'moderate';
    if (totalSets > 20) intensity = 'high';
    else if (totalSets < 10) intensity = 'low';
    
    return { type, intensity };
  };

  const generateRecommendations = () => {
    const workoutAnalysis = analyzeWorkout(currentWorkout);
    let recommended = [];
    
    // Core supplements based on experience level
    if (experience === 'beginner') {
      recommended.push(
        supplementDatabase.proteins[0], // Whey protein
        supplementDatabase.vitamins[2]   // Magnesium
      );
    } else if (experience === 'intermediate') {
      recommended.push(
        supplementDatabase.proteins[0],     // Whey protein
        supplementDatabase.preWorkout[0],   // Creatine
        supplementDatabase.vitamins[2]      // Magnesium
      );
    } else {
      recommended.push(
        supplementDatabase.proteins[0],     // Whey protein
        supplementDatabase.preWorkout[0],   // Creatine
        supplementDatabase.preWorkout[2],   // Caffeine
        supplementDatabase.recovery[0]      // Glutamine
      );
    }
    
    // Goal-specific recommendations
    if (userGoals.includes('muscle-growth')) {
      if (!recommended.find(s => s.id === 'creatine-mono')) {
        recommended.push(supplementDatabase.preWorkout[0]);
      }
      if (!recommended.find(s => s.id === 'bcaa')) {
        recommended.push(supplementDatabase.recovery[1]);
      }
    }
    
    if (userGoals.includes('endurance')) {
      if (!recommended.find(s => s.id === 'beta-alanine')) {
        recommended.push(supplementDatabase.preWorkout[1]);
      }
    }
    
    if (userGoals.includes('recovery')) {
      if (!recommended.find(s => s.id === 'glutamine')) {
        recommended.push(supplementDatabase.recovery[0]);
      }
      if (!recommended.find(s => s.id === 'omega-3')) {
        recommended.push(supplementDatabase.vitamins[1]);
      }
    }
    
    if (userGoals.includes('general-health')) {
      if (!recommended.find(s => s.id === 'vitamin-d3')) {
        recommended.push(supplementDatabase.vitamins[0]);
      }
      if (!recommended.find(s => s.id === 'omega-3')) {
        recommended.push(supplementDatabase.vitamins[1]);
      }
    }
    
    // Workout-specific recommendations
    if (workoutAnalysis.type === 'strength') {
      if (!recommended.find(s => s.id === 'creatine-mono')) {
        recommended.push(supplementDatabase.preWorkout[0]);
      }
    }
    
    if (workoutAnalysis.intensity === 'high') {
      if (!recommended.find(s => s.id === 'citrulline')) {
        recommended.push(supplementDatabase.preWorkout[4]);
      }
    }
    
    setRecommendations(recommended);
  };

  useEffect(() => {
    if (userGoals.length > 0) {
      generateRecommendations();
    }
  }, [userGoals, experience, currentWorkout]);

  const toggleGoal = (goalId) => {
    setUserGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const toggleSupplementSelection = (supplement) => {
    setSelectedSupplements(prev => 
      prev.find(s => s.id === supplement.id)
        ? prev.filter(s => s.id !== supplement.id)
        : [...prev, supplement]
    );
  };

  const toggleDetails = (supplementId) => {
    setShowDetails(prev => ({
      ...prev,
      [supplementId]: !prev[supplementId]
    }));
  };

  const getRecommendationReason = (supplement) => {
    const reasons = [];
    
    if (supplement.category === 'Protein' && userGoals.includes('muscle-growth')) {
      reasons.push('Essential for muscle growth and recovery');
    }
    if (supplement.id === 'creatine-mono' && (userGoals.includes('strength') || experience !== 'beginner')) {
      reasons.push('Proven to increase strength and power output');
    }
    if (supplement.category === 'Recovery' && currentWorkout) {
      reasons.push('Helps with recovery from your workout routine');
    }
    if (supplement.category === 'Vitamin' && userGoals.includes('general-health')) {
      reasons.push('Supports overall health and wellness');
    }
    if (experience === 'beginner' && ['whey-protein', 'magnesium'].includes(supplement.id)) {
      reasons.push('Foundational supplement for beginners');
    }
    
    return reasons.length > 0 ? reasons[0] : 'Recommended based on your profile';
  };

  return (
    <div className="space-y-6">
      {/* AI Copilot Assistant */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="backdrop-blur-md bg-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🤖</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Supplement Copilot</h2>
                <p className="text-sm text-white/80">Powered by OpenAI • FDA-Compliant Recommendations</p>
              </div>
            </div>
            <button
              onClick={() => setShowCopilot(!showCopilot)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                showCopilot 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white text-purple-600 hover:bg-white/90'
              }`}
            >
              {showCopilot ? '🔽 Hide Chat' : '💬 Ask AI'}
            </button>
          </div>

          {showCopilot && (
            <div className="mt-6">
              <CopilotAssistant 
                userGoals={userGoals}
                experience={experience}
                currentWorkout={currentWorkout}
                recommendations={recommendations}
                selectedSupplements={selectedSupplements}
              />
            </div>
          )}
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            ⚙️
          </span>
          Supplement Configuration
        </h2>
        <p className="text-gray-300 mb-8">
          Configure your profile to get personalized, FDA-compliant supplement recommendations.
        </p>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Your Fitness Goals</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {goals.map(goal => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  userGoals.includes(goal.id)
                    ? 'border-purple-400 bg-gradient-to-r from-purple-500/30 to-pink-500/30 shadow-lg shadow-purple-500/25'
                    : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <span className="text-3xl mb-2 block">{goal.icon}</span>
                <p className="text-sm font-medium text-white">{goal.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Experience Level</h3>
          <div className="flex gap-3">
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <button
                key={level}
                onClick={() => setExperience(level)}
                className={`px-6 py-3 rounded-xl font-medium capitalize transition-all duration-200 ${
                  experience === level
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {currentWorkout && (
          <div className="mb-8 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-sm">
                ✨
              </span>
              <div>
                <p className="text-sm font-medium text-green-200">
                  Active Workout: {currentWorkout.name}
                </p>
                <p className="text-xs text-green-300/80 mt-1">
                  Recommendations are tailored to your current workout routine
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              💊
            </span>
            Recommended Supplements
          </h3>
          <div className="space-y-4">
            {recommendations.map(supplement => (
              <div key={supplement.id} className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/20 hover:bg-white/10 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedSupplements.find(s => s.id === supplement.id) !== undefined}
                        onChange={() => toggleSupplementSelection(supplement)}
                        className="w-6 h-6 rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold text-xl text-white">{supplement.name}</h4>
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/30 to-purple-600/30 text-xs rounded-full mt-2 text-purple-200 border border-purple-400/30">
                          {supplement.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 ml-10">
                      <p className="text-sm text-purple-300 font-medium flex items-center gap-2">
                        <span>🎯</span> {getRecommendationReason(supplement)}
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <span className="text-gray-400 flex items-center gap-1">
                            <span>💊</span> Dosage:
                          </span>
                          <span className="ml-2 font-semibold text-white block mt-1">{supplement.dosage}</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <span className="text-gray-400 flex items-center gap-1">
                            <span>⏰</span> Timing:
                          </span>
                          <span className="ml-2 font-semibold text-white block mt-1">{supplement.timing}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button
                          onClick={() => toggleDetails(supplement.id)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-purple-300 rounded-lg hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-200 text-sm font-medium border border-purple-400/30"
                        >
                          {showDetails[supplement.id] ? '📖 Hide Details' : '📖 FDA Compliance & Details'}
                        </button>
                      </div>
                      
                      {showDetails[supplement.id] && (
                        <div className="mt-4 p-5 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-white/20">
                          <h5 className="font-bold text-sm mb-4 text-green-400 flex items-center gap-2">
                            <span>✅</span> FDA Compliance Information
                          </h5>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                              <span className="text-green-400 mt-0.5">✓</span>
                              <div>
                                <span className="font-semibold text-gray-300">Status:</span>
                                <span className="ml-2 text-white">{supplement.compliance.status}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-green-400 mt-0.5">✓</span>
                              <div>
                                <span className="font-semibold text-gray-300">Source:</span>
                                <span className="ml-2 text-white">{supplement.compliance.source}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-blue-400 mt-0.5">🔗</span>
                              <div>
                                <span className="font-semibold text-gray-300">Reference:</span>
                                <a 
                                  href={supplement.compliance.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="ml-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                                >
                                  FDA Documentation
                                </a>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-purple-400 mt-0.5">📅</span>
                              <div>
                                <span className="font-semibold text-gray-300">Last Verified:</span>
                                <span className="ml-2 text-white">{supplement.compliance.lastVerified}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-5 pt-4 border-t border-white/20">
                            <h5 className="font-semibold text-sm mb-2 text-blue-400">Ingredients</h5>
                            <ul className="text-sm text-gray-300 space-y-1">
                              {supplement.ingredients.map((ing, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="text-blue-400">•</span>
                                  {ing}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-white/20">
                            <h5 className="font-semibold text-sm mb-2 text-purple-400">Benefits</h5>
                            <ul className="text-sm text-gray-300 space-y-1">
                              {supplement.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="text-purple-400">•</span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedSupplements.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-xl border-2 border-purple-400/30">
              <h4 className="font-bold mb-4 text-xl text-white flex items-center gap-2">
                <span>📋</span> Your Supplement Stack
              </h4>
              <div className="space-y-3 mb-6">
                {selectedSupplements.map(supp => (
                  <div key={supp.id} className="flex justify-between items-center text-sm bg-white/10 p-3 rounded-lg border border-white/20">
                    <span className="font-semibold text-white">{supp.name}</span>
                    <span className="text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">{supp.dosage}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-purple-400/30">
                <p className="text-sm text-purple-200 flex items-start gap-2">
                  <span className="text-yellow-400">⚠️</span>
                  <span>
                    All recommended supplements contain FDA-compliant ingredients. 
                    Please consult with a healthcare provider before starting any supplement regimen.
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SupplementCopilot;