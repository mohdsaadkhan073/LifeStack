import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { parseTaskInput } from '../utils/parser';
import { Mic, Send, Plus } from 'lucide-react';

const TaskInput = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Parse natural language and add task
    const parsedTask = parseTaskInput(text);
    addTask(parsedTask);
    setText('');
  };

  const toggleVoiceCapture = () => {
    // Basic Web Speech API integration for MVP voice capture
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice capture not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText((prev) => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="glass-panel p-4 rounded-2xl w-full border border-white/5 bg-surface/60 backdrop-blur-2xl transition-all hover:bg-surface/80">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {isListening ? (
            <span className="text-danger flex items-center gap-2 animate-pulse">
              <Mic size={14} /> Listening to your voice...
            </span>
          ) : (
            "Flow Capture"
          )}
        </label>
        <div className="relative flex items-center">
          <input
            id="task-input"
            type="text"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all transition-colors"
            placeholder={isListening ? "Speak now..." : "e.g., Study React for 2 hours tomorrow"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            type="button"
            onClick={toggleVoiceCapture}
            className={`absolute right-2 p-2 rounded-lg transition-colors ${isListening ? 'text-danger bg-danger/20 animate-pulse' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Mic size={18} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="text-xs text-gray-500">NLP enabled: captures priority, duration & time automatically.</div>
          <button 
            type="submit"
            className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-all px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]"
          >
            <Plus size={16} /> Enter Flow
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
