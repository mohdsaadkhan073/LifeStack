import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockTasks } from '../data/mockTasks';
import { arrayMove } from '@dnd-kit/sortable';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [focusMode, setFocusMode] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  const addTask = (taskDetails) => {
    const newTask = {
      id: "t_" + Date.now().toString(),
      ...taskDetails,
      status: "pending" 
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if(t.id === id) {
        return { ...t, status: t.status === "pending" ? "completed" : "pending" };
      }
      return t;
    }));
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const reorderTasks = (activeId, overId) => {
    setTasks((prevTasks) => {
      const oldIndex = prevTasks.findIndex(t => t.id === activeId);
      const newIndex = prevTasks.findIndex(t => t.id === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        return arrayMove(prevTasks, oldIndex, newIndex);
      }
      return prevTasks;
    });
  };

  const startFocus = (task) => {
    setActiveTask(task);
    setFocusMode(true);
  };

  const endFocus = () => {
    setFocusMode(false);
    if(activeTask && activeTask.status === "completed") {
      setActiveTask(null);
    }
  };

  const contextValue = {
    tasks,
    setTasks,
    addTask,
    toggleTaskStatus,
    updateTask,
    reorderTasks,
    focusMode,
    startFocus,
    endFocus,
    activeTask,
    setActiveTask
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};
