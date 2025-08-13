import { useState } from 'react';
import WorkoutDesigner from './components/WorkoutDesigner';
import SupplementCopilot from './components/SupplementCopilot';
import WorkoutSchedule from './components/WorkoutSchedule';

function App() {
  const [activeTab, setActiveTab] = useState('workout');
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Modern Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">FS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  FitSupp Pro
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Fitness & Supplements</p>
              </div>
            </div>
            
            <nav className="flex gap-2">
              {[
                { id: 'workout', label: 'Workout Designer', icon: '💪' },
                { id: 'schedule', label: 'Schedule', icon: '📅' },
                { id: 'supplements', label: 'AI Copilot', icon: '🤖' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          {activeTab === 'workout' && (
            <WorkoutDesigner
              workouts={workouts}
              setWorkouts={setWorkouts}
              currentWorkout={currentWorkout}
              setCurrentWorkout={setCurrentWorkout}
            />
          )}
          {activeTab === 'schedule' && (
            <WorkoutSchedule workouts={workouts} />
          )}
          {activeTab === 'supplements' && (
            <SupplementCopilot workouts={workouts} currentWorkout={currentWorkout} />
          )}
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="mt-auto border-t border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              © 2024 FitSupp Pro • FDA-Compliant Recommendations
            </p>
            <div className="flex gap-4">
              <span className="text-xs text-gray-500">Powered by AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;