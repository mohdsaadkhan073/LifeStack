// src/components/Sidebar.jsx
import React from 'react';
import { Home, Compass, BarChart2, Settings, User } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { tasks } = useTasks();
  
  // Calculate simple Life Score based on completed tasks
  const completedCount = tasks.filter(t => t.status === "completed").length;
  const totalCount = tasks.length;
  const lifeScore = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const navItems = [
    { id: "Dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { id: "Explore", icon: <Compass size={20} />, label: "Explore" },
    { id: "Analytics", icon: <BarChart2 size={20} />, label: "Analytics" },
    { id: "Profile", icon: <User size={20} />, label: "Profile" },
    { id: "Settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="w-20 md:w-64 border-r border-white/5 h-full bg-surface/30 backdrop-blur-md flex flex-col p-4 shrink-0 transition-all z-20">
      <div className="flex items-center gap-3 mb-10 px-2 py-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <span className="font-bold text-white text-lg">L</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white hidden md:block">LifeStack</h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary font-medium border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              title={item.label}
            >
              {item.icon}
              <span className="hidden md:block">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto hidden md:block glass-panel p-4 rounded-2xl border-white/5 bg-black/40">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Life Score</span>
          <span className="text-accent font-bold text-sm">{lifeScore}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out" 
            style={{ width: `${lifeScore}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-500 mt-2 text-center">
          Complete tasks & focus to level up.
        </p>
      </div>
      
      {/* Mobile profile icon placeholder */}
      <div className="mt-auto md:hidden flex justify-center pb-2">
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
          <User size={18} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
