import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Check, X, ArrowRight, Save, Dumbbell } from 'lucide-react';

export default function Workout() {
  const { routines, nextThemeId, addWorkoutLog } = useAppContext();
  const navigate = useNavigate();
  
  const activeRouteId = nextThemeId || 'theme_a';
  const theme = routines.find(r => r.id === activeRouteId);
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const [logs, setLogs] = useState(() => {
    const initialLogs = {};
    theme?.exercises.forEach(ex => {
      initialLogs[ex.id] = {
        done: false,
        sets: Array.from({ length: ex.defaultSets }).map(() => ({
          reps: typeof ex.defaultReps === 'number' ? ex.defaultReps : 0,
          weight: 0,
          time: typeof ex.defaultReps === 'string' ? parseInt(ex.defaultReps) : 0,
        }))
      };
    });
    return initialLogs;
  });

  if (!theme) return null;

  const currentExercise = theme.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === theme.exercises.length - 1;
  const isPlank = typeof currentExercise.defaultReps === 'string';

  const updateSet = (setId, field, delta) => {
    setLogs(prev => {
      const exLogs = prev[currentExercise.id];
      const newSets = [...exLogs.sets];
      
      const newVal = Math.max(0, newSets[setId][field] + delta);
      newSets[setId] = { ...newSets[setId], [field]: newVal };

      return {
        ...prev,
        [currentExercise.id]: { ...exLogs, sets: newSets }
      };
    });
  };

  const markDone = () => {
    setLogs(prev => ({
      ...prev,
      [currentExercise.id]: { ...prev[currentExercise.id], done: true }
    }));
    
    if (isLastExercise) {
      setIsFinished(true);
    } else {
      setCurrentExerciseIndex(i => i + 1);
    }
  };

  const finishWorkout = () => {
    addWorkoutLog({
      themeId: theme.id,
      completedExercises: logs
    });
    // Redirect to camera after finishing
    navigate('/camera');
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center p-6 pt-32 text-center h-[90vh] animate-in zoom-in-95 fade-in">
        <div className="w-24 h-24 bg-[#22c55e]/20 rounded-full flex items-center justify-center mb-6">
          <Check className="w-12 h-12 text-[#22c55e]" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Workout Complete!</h1>
        <p className="text-[#94a3b8] mb-12">Great job crushing {theme.name}.</p>
        
        <button onClick={finishWorkout} className="btn-primary w-full max-w-xs shadow-lg shadow-[#3b82f6]/20 py-4 text-lg">
          Take Progress Picture
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 pt-12 flex flex-col h-full bg-[#0f172a]">
      {/* Header Progress */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-sm font-bold text-[#3b82f6] uppercase tracking-wider">{theme.name}</h2>
          <p className="text-xl font-bold text-white">{currentExercise.name}</p>
        </div>
        <div className="text-xl font-black text-[#334155]">
          <span className="text-white">{currentExerciseIndex + 1}</span> / {theme.exercises.length}
        </div>
      </div>

      {/* Sets Logger */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-8 hide-scrollbar">
        {logs[currentExercise.id]?.sets.map((setInfo, idx) => (
          <div key={idx} className="glass-panel p-4 flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center text-white font-bold text-sm">
              {idx + 1}
            </div>
            
            {isPlank ? (
               <div className="flex items-center gap-4">
                 <div className="flex flex-col items-center gap-1">
                   <p className="text-xs text-[#94a3b8] font-medium uppercase">Secs</p>
                   <div className="flex items-center gap-3">
                     <button onClick={() => updateSet(idx, 'time', -5)} className="w-8 h-8 rounded-full bg-[#334155] text-white flex items-center justify-center hover:bg-[#475569] active:scale-95">-</button>
                     <span className="w-8 text-center font-mono text-xl text-white font-bold">{setInfo.time}</span>
                     <button onClick={() => updateSet(idx, 'time', 5)} className="w-8 h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center hover:bg-[#2563eb] active:scale-95">+</button>
                   </div>
                 </div>
               </div>
            ) : (
              <div className="flex items-center gap-6">
                {/* Reps */}
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider">Reps</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateSet(idx, 'reps', -1)} className="w-8 h-8 rounded-full bg-[#334155] text-white flex items-center justify-center active:scale-95">-</button>
                    <span className="text-center font-mono text-xl text-white font-bold min-w-[32px]">{setInfo.reps}</span>
                    <button onClick={() => updateSet(idx, 'reps', 1)} className="w-8 h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center active:scale-95">+</button>
                  </div>
                </div>

                {/* Weight */}
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider">Lbs</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateSet(idx, 'weight', -5)} className="w-8 h-8 rounded-full bg-[#334155] text-white flex items-center justify-center active:scale-95">-</button>
                    <span className="text-center font-mono text-xl text-white font-bold min-w-[48px]">{setInfo.weight}</span>
                    <button onClick={() => updateSet(idx, 'weight', 5)} className="w-8 h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center active:scale-95">+</button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        ))}
      </div>

      {/* Done Button */}
      <div className="pt-4 mt-auto border-t border-white/5 pb-8 sm:pb-0">
         <button onClick={markDone} className="btn-primary w-full py-5 text-lg font-bold">
           {isLastExercise ? 'Finish Workout' : 'Next Exercise'}
           <ArrowRight className="w-6 h-6 ml-2" />
         </button>
      </div>

    </div>
  );
}
