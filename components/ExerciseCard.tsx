import React, { useState, useEffect } from 'react';
import { Check, Info, Dumbbell, ImageOff } from 'lucide-react';
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isRestDay) return;
    setImageUrl(exercise.imageUrl);
  }, [exercise.imageUrl, isRestDay]);

  return (
    <div className={`
      border rounded-xl overflow-hidden shadow-sm transition-all duration-300 relative
      ${isCompleted 
        ? 'bg-gray-100 border-gray-200 opacity-60' 
        : 'bg-white border-game-dim hover:border-game-dark/30'}
    `}>
      {!isRestDay && (
        <div className="h-48 w-full bg-gray-100 overflow-hidden relative group border-b border-gray-100">
          
          {imageUrl && !imageError ? (
            <img 
              src={imageUrl} 
              alt={exercise.name}
              onError={() => setImageError(true)}
              className={`
                w-full h-full object-cover transition-all duration-500
                ${isCompleted ? 'grayscale opacity-50' : 'group-hover:scale-105'}
              `}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
              <ImageOff className="w-8 h-8 mb-2" />
              <span className="text-xs">Sem imagem</span>
            </div>
          )}
          
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-xs font-bold text-game-dark z-10 border border-game-dim shadow-sm">
            #{index + 1}
          </div>
          
          {isCompleted && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center backdrop-blur-[1px] z-20">
              <div className="bg-game-dark rounded-full p-3 shadow-lg animate-in zoom-in duration-300">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start gap-4 mb-4">
          {isRestDay && (
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors
              ${isCompleted ? 'bg-game-dark text-white' : 'bg-gray-100 text-game-dark border border-gray-200'}
            `}>
              {isCompleted ? <Check size={18} /> : index + 1}
            </div>
          )}
          
          <div className="flex-grow">
            <h3 className={`
              text-lg font-bold leading-tight transition-colors
              ${isCompleted ? 'text-gray-400 line-through decoration-2' : 'text-game-dark'}
            `}>
              {exercise.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5 font-medium uppercase tracking-wide text-[10px]">
              <Dumbbell className="w-3 h-3 text-game-dark" /> 
              {exercise.muscleGroup}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="bg-game-light rounded px-3 py-2.5 border border-game-dim flex flex-col items-center justify-center">
            <span className="text-gray-500 text-[10px] block uppercase font-bold tracking-wider mb-0.5">Séries</span>
            <span className="font-mono font-bold text-xl text-game-dark">{exercise.sets}</span>
          </div>
          <div className="bg-game-light rounded px-3 py-2.5 border border-game-dim flex flex-col items-center justify-center">
            <span className="text-gray-500 text-[10px] block uppercase font-bold tracking-wider mb-0.5">Reps</span>
            <span className="font-mono font-bold text-xl text-game-dark">{exercise.reps}</span>
          </div>
        </div>

        {!isRestDay && (
          <div className="flex items-end gap-3 pt-3 border-t border-gray-100">
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase font-bold mb-1.5 block pl-1">
                Carga (KG)
              </label>
              <div className="relative group">
                <input
                  type="number"
                  placeholder="0"
                  value={weight}
                  onChange={(e) => onWeightChange(e.target.value)}
                  disabled={isCompleted}
                  className="w-full bg-white border border-gray-200 rounded p-2 text-game-dark font-mono font-bold focus:border-game-dark focus:outline-none focus:ring-1 focus:ring-game-dark/20 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-300 transition-all shadow-sm"
                />
              </div>
            </div>

            <button
              onClick={onToggleComplete}
              className={`
                h-10 px-6 rounded font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg
                ${isCompleted 
                  ? 'bg-gray-200 text-gray-500 hover:bg-gray-300' 
                  : 'bg-game-dark text-white hover:bg-gray-800'}
              `}
            >
              {isCompleted ? 'Desfazer' : 'Concluir'}
            </button>
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 bg-game-light p-3 rounded text-xs text-gray-500 border border-game-dim">
          <Info className="w-4 h-4 text-game-dark mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed font-medium">{exercise.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;