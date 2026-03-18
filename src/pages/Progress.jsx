import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';

export default function Progress() {
  const { workoutLogs } = useAppContext();
  const [selectedExercise, setSelectedExercise] = useState('all');

  // get all unique exercises logged
  const allExercises = useMemo(() => {
    const exMap = new Map();
    workoutLogs.forEach(log => {
      Object.entries(log.completedExercises).forEach(([exId, data]) => {
        if (data.done) {
          exMap.set(exId, { id: exId, name: `Exercise ${exId}` }); // We don't have global names easy here, but we can rough it
        }
      });
    });
    return Array.from(exMap.values());
  }, [workoutLogs]);

  // compute volume data
  const chartData = useMemo(() => {
    // reverse so chronological
    const sortedLogs = [...workoutLogs].sort((a,b) => new Date(a.date) - new Date(b.date));
    
    return sortedLogs.map(log => {
      const dateStr = new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      let totalVolume = 0;
      
      Object.entries(log.completedExercises).forEach(([exId, data]) => {
        if (!data.done) return;
        if (selectedExercise !== 'all' && exId !== selectedExercise) return;
        
        data.sets.forEach(set => {
          if (set.reps && set.weight) {
            totalVolume += (set.reps * set.weight);
          } else if (set.time) {
            totalVolume += set.time; // simple metric for planks
          }
        });
      });

      return {
        date: dateStr,
        volume: totalVolume
      };
    }).filter(d => d.volume > 0);
  }, [workoutLogs, selectedExercise]);

  if (workoutLogs.length === 0) {
    return (
      <div className="p-6 pt-24 text-center">
        <div className="w-16 h-16 bg-[#334155] rounded-full mx-auto flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-[#94a3b8]" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No Data Yet</h2>
        <p className="text-[#94a3b8]">Complete your first workout to see progress charts.</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-12 animate-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
          Progress
        </h1>
        <p className="text-[#94a3b8]">Track your total volume over time.</p>
      </div>

      <div className="glass-panel p-4 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white">Total Volume Log</h3>
          <select 
            className="bg-[#334155] text-white text-sm rounded-lg px-2 py-1 outline-none border-none"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            <option value="all">All Exercises</option>
            {allExercises.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#64748b" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#1e293b' }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
