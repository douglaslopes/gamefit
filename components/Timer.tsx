import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw, X } from 'lucide-react';

export default function Timer() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (initialTime > 0) {
        // Play sound or vibrate could go here
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, initialTime]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const setPreset = (seconds: number) => {
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-44 right-6 z-40 bg-game-dark hover:bg-gray-800 text-white p-3 rounded-full shadow-xl shadow-game-dark/20 transition-transform active:scale-90 flex items-center justify-center border border-game-dim"
        aria-label="Abrir Cronômetro"
      >
        <TimerIcon size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-44 right-6 z-40 flex flex-col items-end gap-2 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="bg-white border border-game-dim rounded-2xl p-5 shadow-2xl w-72">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold text-game-dark uppercase tracking-widest flex items-center gap-2">
            <TimerIcon size={14} /> Descanso
          </span>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-game-dark transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="text-center mb-6 relative">
          <div className={`text-6xl font-mono font-bold tabular-nums relative z-10 ${timeLeft === 0 && initialTime > 0 ? 'text-green-600' : 'text-game-dark'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {[30, 45, 60, 90].map((t) => (
            <button
              key={t}
              onClick={() => setPreset(t)}
              className="bg-game-light hover:bg-gray-200 text-xs font-bold py-2 rounded text-gray-500 hover:text-game-dark border border-game-dim transition-all"
            >
              {t}s
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={toggleTimer}
            disabled={timeLeft === 0 && initialTime === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
              isActive 
                ? 'bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200' 
                : 'bg-game-dark text-white hover:bg-gray-800'
            }`}
          >
            {isActive ? <Pause size={16} /> : <Play size={16} />}
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>
          <button 
            onClick={resetTimer}
            className="p-3 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 hover:text-game-dark border border-gray-200 transition-colors"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}