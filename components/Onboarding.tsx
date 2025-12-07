import React, { useState } from 'react';
import { ChevronRight, User, Target, Zap, Check } from 'lucide-react';
import { PLANS } from '../constants';

interface OnboardingProps {
  onComplete: (name: string, levelId: string) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && selectedLevel) {
      onComplete(name, selectedLevel);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-game-light flex flex-col max-w-xl mx-auto">
      <div className="flex-1 p-8 flex flex-col justify-center animate-in fade-in duration-500">
        
        {/* Step 1: Name */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-game-dark rounded-2xl flex items-center justify-center mb-4 shadow-xl">
              <User className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-game-dark mb-2">Bem-vindo ao GameFit</h1>
              <p className="text-gray-500">Vamos personalizar sua experiência. Como devemos te chamar?</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Seu Nome</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Douglas"
                className="w-full text-2xl font-bold bg-transparent border-b-2 border-game-dim focus:border-game-dark outline-none py-2 text-game-dark placeholder-gray-300 transition-colors"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Step 2: Level Selection */}
        {step === 2 && (
          <div className="space-y-6">
             <div className="w-16 h-16 bg-game-dark rounded-2xl flex items-center justify-center mb-4 shadow-xl">
              <Target className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-game-dark mb-2">Qual seu nível atual?</h1>
              <p className="text-gray-500 text-sm">Isso definirá sua estrutura de treino inicial. Você pode mudar depois.</p>
            </div>

            <div className="space-y-3">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedLevel(plan.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden group
                    ${selectedLevel === plan.id 
                      ? 'border-game-dark bg-white shadow-lg' 
                      : 'border-transparent bg-white/50 hover:bg-white border-game-dim'}
                  `}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-bold ${selectedLevel === plan.id ? 'text-game-dark' : 'text-gray-600'}`}>
                      {plan.name}
                    </span>
                    {selectedLevel === plan.id && <Check size={18} className="text-game-dark" />}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                     {plan.id.includes('iniciante') ? 'Treino Full Body (Corpo Inteiro). Foco em adaptação.' : 
                      plan.id.includes('intermediario') ? 'Treino AB / Upper-Lower. Foco em volume.' : 
                      'Treino ABC / Split. Foco em performance.'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      <div className="p-6 bg-white border-t border-game-dim">
        <button
          onClick={handleNext}
          disabled={(step === 1 && !name.trim()) || (step === 2 && !selectedLevel)}
          className="w-full bg-game-dark text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg"
        >
          {step === 1 ? 'Continuar' : 'Começar Treino'} <ChevronRight />
        </button>
      </div>
    </div>
  );
}
