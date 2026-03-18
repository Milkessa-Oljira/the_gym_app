import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, LineChart, Camera, Settings } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Workout', path: '/workout', icon: Dumbbell },
    { name: 'Progress', path: '/progress', icon: LineChart },
    { name: 'Gallery', path: '/gallery', icon: Camera },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative bg-[#0f172a] shadow-2xl overflow-hidden sm:border-x sm:border-white/10">
      
      {/* Main Content Area - scrollable */}
      <main className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="absolute bottom-0 w-full bg-[#1e293b]/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 pb-safe flex justify-between items-center z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-[#3b82f6] scale-110' : 'text-[#64748b] hover:text-[#f8fafc]'
              }`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <span className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3b82f6] rounded-full" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
