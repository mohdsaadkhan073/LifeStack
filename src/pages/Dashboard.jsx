import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import Timeline from '../components/Timeline';
import FocusTimer from '../components/FocusTimer';
import { useTasks } from '../context/TaskContext';
import { useUser } from '../context/UserContext';
import { Compass, BarChart2, Settings, Plus, Zap, Target, User, Save } from 'lucide-react';

const Dashboard = () => {
  const { tasks, startFocus } = useTasks();
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Basic Life Score Calculation
  const completedCount = tasks.filter(t => t.status === "completed").length;
  const totalCount = tasks.length;
  const lifeScore = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const renderContent = () => {
    switch(activeTab) {
      case "Explore":
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface/20 rounded-3xl border border-white/5">
            <Compass size={64} className="text-gray-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-400">Explore Templates</h2>
            <p className="text-gray-500 mt-2 text-center max-w-sm">Discover pre-built daily routines and life-hacks submitted by top performers. Coming in Phase 3.</p>
          </div>
        );
      case "Analytics":
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface/20 rounded-3xl border border-white/5">
            <BarChart2 size={64} className="text-gray-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-400">Your Analytics</h2>
            <p className="text-gray-500 mt-2 text-center max-w-sm">Deep dive into your productivity metrics and energy patterns throughout the week.</p>
          </div>
        );
      case "Profile":
        return (
          <div className="flex-1 glass-panel p-6 md:p-8 rounded-3xl flex flex-col min-h-0 relative overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6 sticky top-0 bg-surface/80 backdrop-blur-md z-10 p-2 -mx-2 px-2">
              <h3 className="font-semibold text-xl">Profile Details</h3>
              <button 
                onClick={() => alert("Profile updated successfully! (Mocked DB save)")}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
            
            <div className="max-w-xl flex flex-col gap-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6 bg-black/30 p-4 rounded-2xl border border-white/5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg text-2xl font-bold text-white uppercase overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-200">Profile Picture</h4>
                  <p className="text-xs text-gray-500 mb-2">JPG, GIF or PNG. Max size 2MB.</p>
                  <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors">
                    Upload new
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-[50%] -translate-y-[50%] text-gray-500" />
                    <input 
                      type="text" 
                      value={user.name}
                      onChange={(e) => updateUser({ name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Phone Number</label>
                  <input 
                    type="tel" 
                    value={user.phone}
                    onChange={(e) => updateUser({ phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Email Address (Read-only)</label>
                  <input 
                    type="email" 
                    value={user.email}
                    disabled
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-2.5 px-4 text-gray-500 cursor-not-allowed outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Short Bio</label>
                  <textarea 
                    value={user.bio}
                    onChange={(e) => updateUser({ bio: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[100px] resize-y custom-scrollbar"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "Settings":
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface/20 rounded-3xl border border-white/5">
            <Settings size={64} className="text-gray-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-400">System Preferences</h2>
            <p className="text-gray-500 mt-2 text-center max-w-sm">Manage cloud sync, AI behaviors, and notification rules.</p>
          </div>
        );
      default: // Dashboard
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* Left Column: Tasks & Input */}
            <div className="lg:col-span-1 flex flex-col min-h-0 relative z-10 w-full">
              <TaskInput />
              <TaskList />
            </div>

            {/* Right Column: Timeline Planner */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col flex-1 min-h-0 relative overflow-hidden bg-surface/40 w-full">
              <Timeline />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex w-full h-full bg-background relative selection:bg-primary/30 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-4 md:p-6 md:pr-8 gap-6 relative">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center w-full shrink-0 gap-4 mb-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
              {activeTab === "Dashboard" ? `Good Morning, ${user.name.split(' ')[0]}` : activeTab}
            </h2>
            <p className="text-sm md:text-base text-gray-400">
              {activeTab === "Dashboard" ? "Let's dominate your day." : 
               activeTab === "Profile" ? "Update your personal details and identity." :
               `Manage your ${activeTab.toLowerCase()} easily.`}  
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Actions Bar */}
            {activeTab === "Dashboard" && (
              <div className="flex bg-black/40 border border-white/10 rounded-xl overflow-hidden glass-panel p-1">
                <button 
                  onClick={() => document.getElementById('task-input')?.focus()}
                  className="px-3 py-1.5 flex items-center gap-2 text-xs font-semibold hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
                >
                  <Plus size={14} className="text-primary" /> Add Task
                </button>
                <button 
                  onClick={() => {
                    const plannerBtn = document.getElementById('plan-my-day-btn');
                    if (plannerBtn) plannerBtn.click();
                  }}
                  className="px-3 py-1.5 flex items-center gap-2 text-xs font-semibold hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
                >
                  <Zap size={14} className="text-accent" /> Plan My Day
                </button>
                <button 
                  onClick={() => {
                      const firstPending = tasks.find(t => t.status === "pending");
                      if(firstPending) startFocus(firstPending);
                  }}
                  className="px-3 py-1.5 flex items-center gap-2 text-xs font-semibold hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
                >
                  <Target size={14} className="text-danger" /> Start Focus
                </button>
              </div>
            )}

            <div className={`text-right glass-panel px-4 py-2 rounded-xl hidden sm:block shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-opacity duration-300 ${activeTab !== "Dashboard" ? "opacity-0 invisible" : ""}`}>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Life Score</span>
              <div className="text-2xl font-black text-accent">{lifeScore}%</div>
            </div>
          </div>
        </header>

        {renderContent()}
      </div>
      
      {/* Absolute Overlays */}
      <FocusTimer />
    </div>
  );
};

export default Dashboard;
