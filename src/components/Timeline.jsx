import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { generateDailyPlan } from '../utils/planner';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const Timeline = () => {
  const { tasks } = useTasks();
  const [timeline, setTimeline] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePlanDay = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateDailyPlan(tasks, 9); // Start at 9 AM
      setTimeline(plan);
      setIsGenerating(false);
    }, 800); // Simulate AI generation delay
  };

  // Re-generate if tasks change drastically ?
  // For MVP, manual clicking "Plan My Day" is better.

  const getSlotColor = (category, priority) => {
    if (priority === "high") return "bg-danger/20 border-danger/40 text-danger";
    if (category === "study") return "bg-blue-500/20 border-blue-500/40 text-blue-400";
    if (category === "work") return "bg-purple-500/20 border-purple-500/40 text-purple-400";
    if (category === "health") return "bg-accent/20 border-accent/40 text-accent";
    return "bg-white/10 border-white/20 text-gray-300";
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="font-semibold text-xl">Daily Planner Timeline</h3>
        <button 
          id="plan-my-day-btn"
          onClick={handlePlanDay}
          disabled={isGenerating}
          className="bg-primary hover:bg-primary/80 transition-all text-white px-5 py-2 rounded-xl font-medium shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-2 disabled:opacity-70 disabled:hover:shadow-none"
        >
          <Zap size={18} className={isGenerating ? "animate-pulse" : ""} />
          {isGenerating ? "Synthesizing..." : "Plan My Day"}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative border-l-2 border-white/10 ml-4 pl-6">
        <AnimatePresence>
          {timeline.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-gray-500 absolute top-1/3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-center"
            >
              <Zap size={40} className="text-gray-700 mx-auto" />
              <p>Hit "Plan My Day" to generate an optimized schedule<br/>based on priority and energy levels.</p>
            </motion.div>
          ) : (
            timeline.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="relative mb-8"
              >
                {/* Time Indicator Point */}
                <div className="absolute -left-[31px] top-4 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10" />
                
                {/* Time Label */}
                <div className="text-xs font-mono text-gray-400 mb-2 flex items-center gap-2">
                  <span className="text-white font-medium">{block.startTime}</span> 
                  <span className="opacity-50">—</span> 
                  <span>{block.endTime}</span>
                  <span className="ml-2 px-1.5 py-0.5 rounded bg-white/5 text-[10px]">{block.durationMinutes}m</span>
                </div>
                
                {/* Task Block */}
                <div className={`p-4 rounded-xl border backdrop-blur-md ${getSlotColor(block.category, block.priority)} transition-all hover:scale-[1.02] cursor-default`}>
                  <h4 className="font-semibold text-lg">{block.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-xs opacity-80">
                    <span className="capitalize">Energy: {block.energy}</span>
                    <span className="capitalize shadow-sm">Priority: {block.priority}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        
        {/* End of day marker */}
        {timeline.length > 0 && (
           <div className="absolute -left-[29px] bottom-0 w-2 h-2 rounded-full bg-white/20 ring-4 ring-background" />
        )}
      </div>
    </div>
  );
};

export default Timeline;
