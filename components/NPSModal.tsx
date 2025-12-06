import React, { useState } from 'react';

interface NPSModalProps {
  isOpen: boolean;
  onSubmit: (score: number) => void;
  onClose: () => void;
}

export default function NPSModal({ isOpen, onSubmit, onClose }: NPSModalProps) {
  const [score, setScore] = useState(8);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-game-dark/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-center text-game-dark mb-2">Treino Concluído! 🎉</h2>
        <p className="text-gray-500 text-center mb-6">Como você se sente mentalmente e emocionalmente agora?</p>
        
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-between text-xs text-gray-400 uppercase font-semibold">
            <span>Esgotado</span>
            <span>Invencível</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={score} 
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-game-dark"
          />
          <div className="text-center font-mono text-5xl font-bold text-game-dark">
            {score}
          </div>
        </div>

        <button 
          onClick={() => onSubmit(score)}
          className="w-full py-4 bg-game-dark hover:bg-gray-800 text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-game-dark/20"
        >
          Salvar & Continuar
        </button>
        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}