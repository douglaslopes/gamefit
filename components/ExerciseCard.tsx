import React from 'react';
import { Check, Info, Dumbbell, Activity } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  isCompleted: boolean;
  weight: string;
  onToggleComplete: () => void;
  onWeightChange: (val: string) => void;
  isRestDay: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  index, 
  isCompleted, 
  weight, 
  onToggleComplete, 
  onWeightChange,
  isRestDay 
}) => {
  return (
    <div className={`
      border rounded-xl overflow-hidden shadow-sm transition-all duration-300 relative
      ${isCompleted 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-white border-game-dim hover:border-game-dark/30'}
    `}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Checkbox / Number Indicator */}
          <button
             onClick={!isRestDay ? onToggleComplete : undefined}
             className={`
              flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-300
              ${isCompleted 
                ? 'bg-green-500 text-white shadow-md scale-95' 
                : 'bg-game-light text-game-dark border-2 border-game-dim hover:border-game-dark'}
            `}
          >
            {isCompleted ? <Check size={24} strokeWidth={3} /> : <span className="text-lg">{index + 1}</span>}
          </button>
          
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start">
              <h3 className={`
                text-lg font-bold leading-tight transition-colors truncate pr-2
                ${isCompleted ? 'text-gray-400 line-through decoration-2' : 'text-game-dark'}
              `}>
                {exercise.name}
              </h3>
            </div>
            
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 font-bold uppercase tracking-wide">
              <Dumbbell className="w-3 h-3 text-game-dark" /> 
              {exercise.muscleGroup}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`mt-4 grid grid-cols-2 gap-3 transition-opacity duration-300 ${isCompleted ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Meta</span>
            <div className="flex items-center gap-2 text-sm font-mono font-bold text-game-dark bg-game-light px-3 py-2 rounded border border-game-dim">
              <Activity size={14} className="text-gray-400" />
              {exercise.sets} x {exercise.reps}
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 pl-1">Carga (Kg)</span>
            {!isRestDay ? (
              <input
                type="number"
                placeholder="0"
                value={weight}
                onChange={(e) => onWeightChange(e.target.value)}
                disabled={isCompleted}
                className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-game-dark font-mono font-bold focus:border-game-dark focus:outline-none focus:ring-1 focus:ring-game-dark/20 disabled:bg-transparent placeholder:text-gray-300 transition-all shadow-sm h-[38px]"
              />
            ) : (
              <div className="h-[38px] bg-gray-50 border border-gray-100 rounded"></div>
            )}
          </div>
        </div>

        {/* Description / Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-start gap-2 text-xs text-gray-500 leading-tight flex-1">
            <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p>{exercise.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
