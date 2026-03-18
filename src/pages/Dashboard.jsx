import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Play, Flame, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { routines, nextThemeId, workoutLogs, gallery } = useAppContext();
  
  const nextRoutine = routines.find(r => r.id === nextThemeId);
  
  // Calculate some simple stats
  const totalWorkouts = workoutLogs.length;
  const totalPhotos = gallery.length;
  
  const currentStreak = () => {
    if (totalWorkouts === 0) return 0;
    // Simple mock streak: just counting recent days is complex without full calendar logic
    // For MVp, we'll just say 1 if they worked out recently, or show total.
    return totalWorkouts; 
  };

  const getRecentWorkout = () => {
    if (totalWorkouts === 0) return null;
    return workoutLogs[0]; // assuming latest is first
  };

  const lastWorkout = getRecentWorkout();

  return (
    <div className="p-6 pt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
          Stay Hard.
        </h1>
        <p className="text-[#94a3b8]">Ready to crush today's session?</p>
      </div>

      {/* Up Next Card */}
      <div className="glass-panel p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <DumbbellBg className="w-24 h-24" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#3b82f6]/20 text-[#3b82f6] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Up Next
            </span>
            <span className="text-[#64748b] text-sm font-medium">
              {nextRoutine?.type}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-1">
            {nextRoutine?.name}
          </h2>
          <p className="text-[#94a3b8] mb-6 text-sm">
            {nextRoutine?.exercises.length} Exercises • ~60 Min
          </p>

          <Link to="/workout" className="btn-primary w-full group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
            <Play className="w-5 h-5 mr-2 fill-current" />
            Start Workout
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
          <div className="bg-[#eab308]/20 p-3 rounded-full mb-3 text-[#eab308]">
            <Flame className="w-6 h-6" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{currentStreak()}</p>
          <p className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider">Total Sessions</p>
        </div>
        
        <Link to="/gallery" className="glass-panel p-4 flex flex-col items-center justify-center text-center hover:bg-[#334155]/80 transition-colors">
          <div className="bg-[#22c55e]/20 p-3 rounded-full mb-3 text-[#22c55e]">
            <ImageIcon className="w-6 h-6" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{totalPhotos}</p>
          <p className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider">Progress Pics</p>
        </Link>
      </div>

      {/* Recent Activity */}
      {lastWorkout && (
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
            Last Session
          </h3>
          <div className="glass-panel p-4 border-l-4 border-l-[#3b82f6]">
            <p className="font-semibold text-white">
              {routines.find(r => r.id === lastWorkout.themeId)?.name || 'Workout'}
            </p>
            <p className="text-sm text-[#94a3b8] mt-1">
              {new Date(lastWorkout.date).toLocaleDateString(undefined, {
                weekday: 'short', month: 'short', day: 'numeric'
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// simple bg decoration
function DumbbellBg(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.767 1.768a2 2 0 1 1 2.829 2.828z" />
    </svg>
  );
}
