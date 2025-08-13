import { useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const dayColors = {
  Monday: 'from-blue-500 to-cyan-500',
  Tuesday: 'from-purple-500 to-pink-500',
  Wednesday: 'from-green-500 to-emerald-500',
  Thursday: 'from-orange-500 to-red-500',
  Friday: 'from-indigo-500 to-purple-500',
  Saturday: 'from-pink-500 to-rose-500',
  Sunday: 'from-yellow-500 to-orange-500'
};

function WorkoutSchedule({ workouts }) {
  const [schedule, setSchedule] = useState({
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null
  });

  const assignWorkout = (day, workoutId) => {
    setSchedule({
      ...schedule,
      [day]: workoutId
    });
  };

  const clearDay = (day) => {
    setSchedule({
      ...schedule,
      [day]: null
    });
  };

  const getWorkoutById = (id) => {
    return workouts.find(w => w.id === id);
  };

  const activeWorkoutDays = Object.values(schedule).filter(s => s !== null).length;
  const restDays = 7 - activeWorkoutDays;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="backdrop-blur-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Workout Days</p>
              <p className="text-3xl font-bold text-white mt-1">{activeWorkoutDays}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              💪
            </div>
          </div>
        </div>
        
        <div className="backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Rest Days</p>
              <p className="text-3xl font-bold text-white mt-1">{restDays}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              😴
            </div>
          </div>
        </div>
        
        <div className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Unique Workouts</p>
              <p className="text-3xl font-bold text-white mt-1">
                {new Set(Object.values(schedule).filter(s => s !== null)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            📅
          </span>
          Weekly Schedule
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {daysOfWeek.map(day => {
            const assignedWorkout = schedule[day] ? getWorkoutById(schedule[day]) : null;
            
            return (
              <div key={day} className="backdrop-blur-md bg-white/5 rounded-xl p-5 border border-white/20 hover:bg-white/10 transition-all duration-200">
                <div className={`h-2 bg-gradient-to-r ${dayColors[day]} rounded-full mb-4`}></div>
                <h3 className="font-bold text-lg text-white mb-3">{day}</h3>
                
                {assignedWorkout ? (
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-4 rounded-lg border border-white/10">
                      <p className="font-semibold text-white">{assignedWorkout.name}</p>
                      <p className="text-sm text-gray-300 mt-1">
                        {assignedWorkout.exercises.length} exercises
                      </p>
                      <div className="mt-3">
                        <p className="text-xs text-gray-400 mb-2">Exercises:</p>
                        <ul className="text-xs text-gray-300 space-y-1">
                          {assignedWorkout.exercises.slice(0, 3).map((ex, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <span className="text-purple-400">•</span>
                              {ex.name}
                            </li>
                          ))}
                          {assignedWorkout.exercises.length > 3 && (
                            <li className="text-gray-500 italic">
                              +{assignedWorkout.exercises.length - 3} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={() => clearDay(day)}
                      className="w-full px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                    >
                      Clear Day
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-400 mb-3">Rest Day</p>
                      {workouts.length > 0 ? (
                        <select
                          onChange={(e) => e.target.value && assignWorkout(day, parseInt(e.target.value))}
                          className="w-full text-sm px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          defaultValue=""
                        >
                          <option value="" className="bg-gray-800">Assign workout</option>
                          {workouts.map(workout => (
                            <option key={workout.id} value={workout.id} className="bg-gray-800">
                              {workout.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-xs text-gray-500">Create workouts first</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Weekly Overview */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl p-6 border border-white/20">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400">📈</span>
            Weekly Overview
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map(day => {
              const hasWorkout = schedule[day] !== null;
              return (
                <div key={day} className="text-center">
                  <p className="text-xs text-gray-400 mb-2">{day.slice(0, 3)}</p>
                  <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center ${
                    hasWorkout 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/25' 
                      : 'bg-white/10 border border-white/20'
                  }`}>
                    <span className="text-lg">{hasWorkout ? '💪' : '😴'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSchedule;