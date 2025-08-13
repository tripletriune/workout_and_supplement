import { useState } from 'react';

const exerciseCategories = {
  chest: ['Bench Press', 'Incline Press', 'Dumbbell Flyes', 'Push-ups', 'Cable Crossovers'],
  back: ['Pull-ups', 'Deadlifts', 'Bent-Over Row', 'Lat Pulldown', 'T-Bar Row'],
  legs: ['Squats', 'Leg Press', 'Lunges', 'Leg Curls', 'Calf Raises'],
  shoulders: ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Shrugs', 'Upright Row'],
  arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Cable Pushdowns', 'Preacher Curls'],
  core: ['Plank', 'Crunches', 'Russian Twists', 'Leg Raises', 'Mountain Climbers']
};

const categoryIcons = {
  chest: '🏋️',
  back: '💪',
  legs: '🦵',
  shoulders: '🤸',
  arms: '💪',
  core: '🧘'
};

function WorkoutDesigner({ workouts, setWorkouts, currentWorkout, setCurrentWorkout }) {
  const [workoutName, setWorkoutName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('chest');
  const [exercises, setExercises] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const addExercise = (exerciseName) => {
    const newExercise = {
      id: Date.now(),
      name: exerciseName,
      sets: 3,
      reps: 10,
      weight: 0,
      restTime: 60
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (id, field, value) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const saveWorkout = () => {
    if (!workoutName || exercises.length === 0) {
      alert('Please add a workout name and at least one exercise');
      return;
    }

    const workout = {
      id: editingWorkout ? editingWorkout.id : Date.now(),
      name: workoutName,
      exercises: exercises,
      createdAt: editingWorkout ? editingWorkout.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingWorkout) {
      setWorkouts(workouts.map(w => w.id === editingWorkout.id ? workout : w));
      setEditingWorkout(null);
    } else {
      setWorkouts([...workouts, workout]);
    }

    setCurrentWorkout(workout);
    resetForm();
  };

  const editWorkout = (workout) => {
    setEditingWorkout(workout);
    setWorkoutName(workout.name);
    setExercises(workout.exercises);
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
    if (currentWorkout?.id === id) {
      setCurrentWorkout(null);
    }
  };

  const resetForm = () => {
    setWorkoutName('');
    setExercises([]);
    setEditingWorkout(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              💪
            </span>
            Create Workout
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Workout Name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md"
              placeholder="e.g., Upper Body Day"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Exercise Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(exerciseCategories).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <span className="mr-2">{categoryIcons[cat]}</span>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Available Exercises</h3>
            <div className="grid grid-cols-2 gap-2">
              {exerciseCategories[selectedCategory].map(exercise => (
                <button
                  key={exercise}
                  onClick={() => addExercise(exercise)}
                  className="text-left px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 rounded-xl text-sm text-gray-200 transition-all duration-200 border border-white/10 hover:border-white/20"
                >
                  <span className="mr-2">➕</span>
                  {exercise}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Selected Exercises</h3>
            {exercises.length === 0 ? (
              <p className="text-gray-400 text-sm bg-white/5 rounded-xl p-4 border border-white/10">
                No exercises selected yet. Choose from the categories above.
              </p>
            ) : (
              <div className="space-y-3">
                {exercises.map(exercise => (
                  <div key={exercise.id} className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-white text-lg">{exercise.name}</h4>
                      <button
                        onClick={() => removeExercise(exercise.id)}
                        className="text-red-400 hover:text-red-300 text-sm px-3 py-1 bg-red-500/20 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Sets</label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Reps</label>
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(exercise.id, 'reps', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Weight (lbs)</label>
                        <input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => updateExercise(exercise.id, 'weight', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          min="0"
                          step="5"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Rest (sec)</label>
                        <input
                          type="number"
                          value={exercise.restTime}
                          onChange={(e) => updateExercise(exercise.id, 'restTime', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          min="0"
                          step="15"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveWorkout}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
            >
              {editingWorkout ? 'Update Workout' : 'Save Workout'}
            </button>
            {editingWorkout && (
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl font-medium hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-sm">
              📋
            </span>
            Saved Workouts
          </h2>
          {workouts.length === 0 ? (
            <p className="text-gray-400 text-sm bg-white/5 rounded-xl p-4 border border-white/10">
              No workouts saved yet. Create your first workout!
            </p>
          ) : (
            <div className="space-y-3">
              {workouts.map(workout => (
                <div 
                  key={workout.id} 
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    currentWorkout?.id === workout.id 
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-600/30 border-2 border-purple-400' 
                      : 'bg-white/10 border border-white/20 hover:bg-white/20'
                  }`}
                  onClick={() => setCurrentWorkout(workout)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{workout.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {workout.exercises.length} exercises
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editWorkout(workout);
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm px-2 py-1 bg-blue-500/20 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWorkout(workout.id);
                        }}
                        className="text-red-400 hover:text-red-300 text-sm px-2 py-1 bg-red-500/20 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkoutDesigner;