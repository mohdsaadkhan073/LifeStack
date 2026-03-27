// src/utils/planner.js

/**
 * Auto-Day Planner Logic
 * Core Algorithm:
 * 1. Sort tasks by priority (high > medium > low) and deadline.
 * 2. Assign time slots based on expected duration. Basic collision avoidance.
 * 3. Assign optimal time of day based on energy levels if possible.
 */

export const generateDailyPlan = (tasks, startHour = 9) => {
  // Deep copy pending tasks
  let pendingTasks = tasks.filter(t => t.status === "pending").map(t => ({ ...t }));
  
  // Sorting: High priority first, then deadline (if we had strict deadlines, but using simple approach)
  const priorityWeight = { high: 3, medium: 2, low: 1 };
  
  pendingTasks.sort((a, b) => {
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  });

  const timeline = [];
  
  // Current time pointer (in minutes from start of day, e.g., 9:00 AM = 9 * 60 = 540)
  let currentTimeInMinutes = startHour * 60; 

  pendingTasks.forEach(task => {
    const startTime = formatTimeFromMinutes(currentTimeInMinutes);
    const duration = task.duration || 60;
    
    // Add to timeline
    timeline.push({
      ...task,
      startTime: startTime,
      endTime: formatTimeFromMinutes(currentTimeInMinutes + duration),
      durationMinutes: duration,
      startMinutes: currentTimeInMinutes // useful for absolute positioning in UI later
    });

    // Advance time pointer (plus 10 mins break buffer between tasks)
    currentTimeInMinutes += duration + 10;
  });

  return timeline;
};

// Helper: 540 -> "09:00 AM"
const formatTimeFromMinutes = (totalMinutes) => {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  const period = hours24 >= 12 && hours24 < 24 ? 'PM' : 'AM';
  const displayHours = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  return `${displayHours}:${displayMinutes} ${period}`;
};
