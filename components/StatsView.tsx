import React, { useMemo } from 'react';
import { Trophy, TrendingUp, Zap, Target, Calendar, Award, Trash2, Download, RefreshCw, Lock, Star } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { PLANS, LEVEL_3_PLAN } from '../constants';
import { UserProgressData, WorkoutHistoryItem } from '../types';

interface StatsViewProps {
  userProgress: UserProgressData | null;
  workoutHistory: WorkoutHistoryItem[];
  onReset: () => void;
  onChangePlan: (planId: string) => void;
}

export default function StatsView({ userProgress, workoutHistory, onReset, onChangePlan }: StatsViewProps) {
  
  const chartData = useMemo(() => {
    return workoutHistory.slice(-10).map((h) => ({
      date: new Date(h.date).toLocaleDateString('pt-BR', { weekday: 'short' }),
      score: h.nps
    }));
  }, [workoutHistory]);

  const averageNPS = useMemo(() => {
    if (workoutHistory.length === 0) return 0;
    const sum = workoutHistory.reduce((acc, h) => acc + h.nps, 0);
    return (sum / workoutHistory.length).toFixed(1);
  }, [workoutHistory]);

  const currentPlan = PLANS.find(p => p.id === userProgress?.unlocked_level_id) || PLANS[0];
  const currentPlanIndex = PLANS.findIndex(p => p.id === currentPlan.id);
  
  // Logic for specific level progress
  const currentLevelWorkouts = userProgress?.level_history?.[currentPlan.id] || 0;
  const isEliteMode = currentPlan.id === LEVEL_3_PLAN.id && currentLevelWorkouts > 30;
  
  // Targets: If Elite Mode (lvl 3 > 30 workouts), target is 365. Else, target is the plan's requirement (14, 21 or 30).
  const progressTarget = isEliteMode ? 365 : currentPlan.workoutsToFinish;
  const progressCurrent = currentLevelWorkouts;
  
  const progressPercent = Math.min(100, (progressCurrent / progressTarget) * 100);

  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Nome,Grupo Muscular,Link Imagem Atual\n";
    const addedIds = new Set();

    PLANS.forEach(plan => {
      plan.schedule.forEach(day => {
        const allExercises = [...day.exercisesHome, ...day.exercisesGym];
        allExercises.forEach(ex => {
          if (!addedIds.has(ex.id)) {
            const safeName = `"${ex.name.replace(/"/g, '""')}"`;
            const safeGroup = `"${ex.muscleGroup.replace(/"/g, '""')}"`;
            csvContent += `${ex.id},${safeName},${safeGroup},${ex.imageUrl}\n`;
            addedIds.add(ex.id);
          }
        });
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gamefit_exercicios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Header in Stats */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-12 h-12 bg-white rounded-full border border-game-dim flex items-center justify-center font-bold text-xl text-game-dark">
            {userProgress?.name ? userProgress.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
            <h2 className="text-lg font-bold text-game-dark leading-none">Perfil de {userProgress?.name}</h2>
            <p className="text-xs text-gray-500">Membro desde {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Gamification Card */}
      <div className={`rounded-2xl p-6 shadow-xl relative overflow-hidden text-white transition-all duration-500 ${isEliteMode ? 'bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700' : 'bg-game-dark'}`}>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          {isEliteMode ? <Star size={120} className="text-white" /> : <Trophy size={120} className="text-white" />}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {isEliteMode ? <Star className="text-yellow-100" fill="currentColor" /> : <Award className="text-white" />}
              {isEliteMode ? 'ELITE MASTER' : currentPlan.name}
            </h2>
            <span className={`text-xs font-mono border px-2 py-1 rounded ${isEliteMode ? 'bg-black/20 border-black/10 text-white' : 'bg-white/10 border-white/20'}`}>
              {isEliteMode ? 'LENDA' : `LVL ${currentPlanIndex + 1}`}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-white/70 mb-1 font-semibold uppercase tracking-wider">
              <span>{isEliteMode ? 'Jornada Anual' : 'Progresso do Nível'}</span>
              <span className="text-white">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-white/80 flex items-center gap-1.5">
            <Target size={14} className="text-white/60" />
            {isEliteMode 
              ? <span>Faltam <span className="font-bold text-white">{Math.max(0, progressTarget - progressCurrent)}</span> dias para completar o ano.</span>
              : <span>Faltam <span className="font-bold text-white">{Math.max(0, progressTarget - progressCurrent)}</span> treinos para concluir este nível.</span>
            }
          </p>
        </div>
      </div>

      {/* Plan Switcher */}
      <div className="bg-white p-4 rounded-xl border border-game-dim shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-game-dark flex items-center gap-2 text-sm uppercase tracking-wide">
            <RefreshCw size={16} /> Alterar Plano de Treino
          </h3>
        </div>
        <div className="space-y-2">
            {PLANS.map(plan => {
                const isActive = currentPlan.id === plan.id;
                // Allow switching if: it's the active plan (no-op), or current plan history is 0 (started new), or completed a 7-day cycle
                const canSwitch = isActive || currentLevelWorkouts === 0 || (currentLevelWorkouts % 7 === 0);
                
                return (
                  <button
                      key={plan.id}
                      onClick={() => {
                          if (canSwitch) onChangePlan(plan.id);
                          else alert(`Complete o ciclo semanal de 7 treinos antes de trocar! Você fez ${currentLevelWorkouts % 7} de 7.`);
                      }}
                      className={`w-full text-left p-3 rounded border text-sm flex items-center justify-between transition-colors relative
                          ${isActive
                              ? 'bg-game-dark text-white border-game-dark' 
                              : canSwitch 
                                ? 'bg-game-light text-game-dark border-game-dim hover:border-gray-300'
                                : 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed'}
                      `}
                  >
                      <span className="font-bold">{plan.name}</span>
                      <div className="flex items-center gap-2">
                          {isActive && <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded">Ativo</span>}
                          {!canSwitch && !isActive && <Lock size={14} className="text-gray-400" />}
                      </div>
                  </button>
                );
            })}
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
            * Mudanças de plano só são permitidas ao completar ciclos de 7 treinos.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-game-dim shadow-sm">
          <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Zap size={14} className="text-game-dark" /> Sequência
          </div>
          <p className="text-3xl font-mono font-bold text-game-dark">
            {userProgress?.current_streak || 0}<span className="text-base text-gray-400 ml-1">dias</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-game-dim shadow-sm">
          <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" /> Total
          </div>
          <p className="text-3xl font-mono font-bold text-game-dark">
            {userProgress?.total_workouts || 0}<span className="text-base text-gray-400 ml-1">treinos</span>
          </p>
        </div>
      </div>

      {/* History Chart */}
      <div className="bg-white p-4 rounded-xl border border-game-dim shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-game-dark flex items-center gap-2 text-sm uppercase tracking-wide">
            <TrendingUp size={16} className="text-game-dark" />
            Performance (NPS)
          </h3>
          <span className="text-xs font-mono bg-game-light border border-game-dim px-2 py-1 rounded text-gray-500">
            Média: {averageNPS}
          </span>
        </div>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E4DF" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={10} 
                domain={[0, 10]} 
                hide
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#2F353B', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#FFFFFF' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#2F353B" 
                strokeWidth={3}
                dot={{ fill: '#F5F4EF', stroke: '#2F353B', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2F353B' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Admin / Settings Area */}
      <div className="pt-8 border-t border-game-dim space-y-3">
         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Zona de Gerenciamento</h4>
         
         <button
            onClick={handleDownloadCSV}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-game-dim rounded-lg text-game-dark hover:bg-gray-50 transition-colors text-xs font-bold uppercase tracking-wider"
         >
           <Download size={16} /> Baixar Planilha de Exercícios
         </button>

         <button
            onClick={() => {
              if(window.confirm('Tem certeza? Isso apagará todo seu progresso e histórico.')) {
                onReset();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-xs font-bold uppercase tracking-wider"
         >
           <Trash2 size={16} /> Resetar Dados
         </button>
      </div>
    </div>
  );
}
