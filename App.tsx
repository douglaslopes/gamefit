import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Activity, 
  TrendingUp, 
  CheckCircle2, 
  Zap,
  Home,
  Dumbbell,
  Lock,
  Sparkles
} from 'lucide-react';

import { PLANS, LEVEL_1_PLAN, MOTIVATIONAL_QUOTES, WORKOUT_TIPS } from './constants';
import { base44 } from './services/storage';
import ExerciseCard from './components/ExerciseCard';
import NPSModal from './components/NPSModal';
import StatsView from './components/StatsView';
import Timer from './components/Timer';
import Onboarding from './components/Onboarding';

// Importando o logo diretamente para garantir que o build o encontre
import logo from './logo.png';

const WorkoutHistory = base44.entities.WorkoutHistory;
const UserProgress = base44.entities.UserProgress;

export default function App() {
  const queryClient = useQueryClient();
  
  // UI State
  const [activeTab, setActiveTab] = useState('workout');
  const [showNPS, setShowNPS] = useState(false);
  const [location, setLocation] = useState<'home' | 'gym'>('home');
  const [sessionData, setSessionData] = useState<Record<string, { completed: boolean; weight: string }>>({});
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());

  // Daily motivation (random from constants)
  const [dailyMotivation] = useState(() => {
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    return { quote: randomQuote };
  });

  // Fetch user progress
  const { data: userProgressList = [], isLoading: isLoadingProgress } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => UserProgress.list()
  });

  // Fetch workout history
  const { data: workoutHistory = [] } = useQuery({
    queryKey: ['workoutHistory'],
    queryFn: () => WorkoutHistory.list('-created_date', 100)
  });

  const userProgress = userProgressList[0] || null;

  // Mutations
  const createProgressMutation = useMutation({
    mutationFn: (data: any) => UserProgress.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProgress'] })
  });

  const updateProgressMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => UserProgress.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProgress'] })
  });

  const createHistoryMutation = useMutation({
    mutationFn: (data: any) => WorkoutHistory.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutHistory'] })
  });

  // Derived Values
  const currentPlan = PLANS.find(p => p.id === userProgress?.unlocked_level_id) || LEVEL_1_PLAN;
  const todayWorkout = currentPlan.schedule[selectedDayIndex];
  const currentExercises = location === 'home' ? todayWorkout.exercisesHome : todayWorkout.exercisesGym;
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const todayTip = WORKOUT_TIPS[todayWorkout.focus] || 'Foque na técnica antes da carga!';

  // Tag styling based on workout type
  const getTagInfo = () => {
    if (todayWorkout.isRestDay) {
      return { 
        text: 'Recuperação', 
        classes: 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
      };
    }
    
    if (currentPlan.id.includes('iniciante')) {
      return { 
        text: 'Adaptação & Técnica', 
        classes: 'bg-blue-100 text-blue-800 border border-blue-200' 
      };
    }
    
    return { 
      text: 'Hipertrofia & Força', 
      classes: 'bg-orange-100 text-orange-800 border border-orange-200' 
    };
  };

  const tagInfo = getTagInfo();

  // Progress Bar Calculation
  const totalExercises = currentExercises.length;
  const completedExercises = currentExercises.filter(ex => sessionData[ex.id]?.completed).length;
  const sessionProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : todayWorkout.isRestDay ? 100 : 0;

  // Check if workout is complete
  const isWorkoutComplete = useMemo(() => {
    if (todayWorkout.isRestDay) return true;
    if (currentExercises.length === 0) return true;
    return currentExercises.every(ex => sessionData[ex.id]?.completed);
  }, [currentExercises, sessionData, todayWorkout.isRestDay]);

  // Handlers
  const handleOnboardingComplete = async (name: string, levelId: string) => {
    await createProgressMutation.mutateAsync({
      name,
      total_workouts: 0,
      current_streak: 0,
      unlocked_level_id: levelId,
      level_history: { [levelId]: 0 } // Initialize history for the selected level
    });
  };

  const handleChangePlan = async (planId: string) => {
    if (userProgress?.id) {
        // Initialize level history if it doesn't exist for the new plan
        const updatedHistory = { ...(userProgress.level_history || {}) };
        if (!updatedHistory[planId]) {
            updatedHistory[planId] = 0;
        }

        await updateProgressMutation.mutateAsync({
            id: userProgress.id,
            data: { 
                unlocked_level_id: planId,
                level_history: updatedHistory
            }
        });
        alert('Plano alterado com sucesso! Boa sorte no novo nível.');
    }
  };

  const handleToggleExercise = (exerciseId: string) => {
    setSessionData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        completed: !prev[exerciseId]?.completed
      }
    }));
  };

  const handleWeightChange = (exerciseId: string, value: string) => {
    setSessionData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        weight: value
      }
    }));
  };

  const handleFinishWorkout = () => {
    if (!isWorkoutComplete) return;
    setShowNPS(true);
  };

  const handleResetData = async () => {
    try {
      localStorage.removeItem('fitquest_user_progress');
      localStorage.removeItem('fitquest_workout_history');
      setSessionData({});
      await queryClient.resetQueries();
      queryClient.clear();
      // Force reload to clear state completely
      window.location.reload();
    } catch (e) {
      console.error("Error resetting data", e);
      alert("Erro ao resetar. Tente recarregar a página manualmente.");
    }
  };

  const handleSubmitNPS = async (score: number) => {
    const now = new Date().toISOString();
    let newStreak = userProgress?.current_streak || 0;
    
    if (userProgress?.last_workout_date) {
      const lastDate = new Date(userProgress.last_workout_date);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 2) newStreak += 1;
      else newStreak = 1;
    } else {
      newStreak = 1;
    }

    const newTotal = (userProgress?.total_workouts || 0) + 1;
    
    // Update Level Specific History
    const currentLevelId = userProgress?.unlocked_level_id || currentPlan.id;
    const currentLevelHistory = userProgress?.level_history || {};
    const newLevelCount = (currentLevelHistory[currentLevelId] || 0) + 1;
    const updatedHistory = { ...currentLevelHistory, [currentLevelId]: newLevelCount };

    // Save history
    const entries = Object.entries(sessionData) as [string, { completed: boolean; weight: string }][];
    const exercisesCompleted = entries
      .filter(([_, data]) => data.completed)
      .map(([id, data]) => ({ exercise_id: id, weight: data.weight || '' }));

    await createHistoryMutation.mutateAsync({
      date: now,
      nps: score,
      workout_focus: todayWorkout.focus,
      exercises_completed: exercisesCompleted
    });

    // Update progress
    if (userProgress?.id) {
      await updateProgressMutation.mutateAsync({
        id: userProgress.id,
        data: {
          total_workouts: newTotal,
          current_streak: newStreak,
          last_workout_date: now,
          level_history: updatedHistory
        }
      });
    }

    setSessionData({});
    setShowNPS(false);
    setActiveTab('stats');
  };

  // Show Onboarding if no progress found after loading
  if (!isLoadingProgress && !userProgress) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-game-light text-game-dark max-w-xl mx-auto shadow-2xl overflow-hidden relative border-x border-game-dim flex flex-col">
      
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-game-light/95 backdrop-blur sticky top-0 z-40 border-b border-game-dim">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center relative">
            <img 
              src={logo} 
              alt="GameFit" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div>
            <h1 className="text-sm font-bold text-gray-400 leading-none">Olá,</h1>
            <p className="text-xl font-black italic tracking-tight text-game-dark uppercase truncate max-w-[150px]">
              {userProgress?.name || 'Atleta'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-white pl-3 pr-4 py-1.5 rounded-full border border-game-dim shadow-sm">
          <Zap className="text-game-dark w-4 h-4 fill-game-dark" />
          <span className="font-mono font-bold text-sm text-game-dark">{userProgress?.current_streak || 0}</span>
        </div>
      </header>
      
      {/* Session Progress Bar */}
      {activeTab === 'workout' && (
        <div className="sticky top-[89px] z-30 w-full h-1 bg-gray-200">
           <div 
             className="h-full bg-game-dark transition-all duration-500 ease-out"
             style={{ width: `${sessionProgress}%` }}
           />
        </div>
      )}

      {/* Main Content */}
      <main className="p-6 flex-1">
        {activeTab === 'workout' && (
          <div className="pb-48"> 
            
            {/* Motivation Card */}
            <div className="mb-6 bg-white border border-game-dim rounded-xl p-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-game-dark"></div>
              <p className="text-game-dark italic font-medium text-sm mb-2 relative z-10">"{dailyMotivation.quote}"</p>
              <div className="flex items-start gap-2 text-xs text-gray-500 mt-2 border-t border-gray-100 pt-2">
                <span className="bg-game-dark text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                  <Sparkles size={10} /> Dica
                </span>
                {todayTip}
              </div>
            </div>

            {/* Day Selector */}
            <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {dayNames.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDayIndex(idx);
                    setSessionData({});
                  }}
                  className={`
                    w-10 h-10 rounded-xl text-xs font-bold transition-all flex-shrink-0 border shadow-sm
                    ${idx === selectedDayIndex 
                      ? 'bg-game-dark border-game-dark text-white scale-105' 
                      : idx === new Date().getDay()
                        ? 'bg-white border-game-dark text-game-dark'
                        : 'bg-white border-game-dim text-gray-400 hover:text-game-dark hover:border-gray-300'}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Location Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-white p-1 rounded-lg border border-game-dim flex items-center shadow-sm">
                <button 
                  onClick={() => setLocation('home')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-md text-xs font-bold transition-all ${
                    location === 'home' 
                      ? 'bg-game-dark text-white shadow-md' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Home size={14} /> Casa
                </button>
                <button 
                  onClick={() => setLocation('gym')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-md text-xs font-bold transition-all ${
                    location === 'gym' 
                      ? 'bg-game-dark text-white shadow-md' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Dumbbell size={14} /> Academia
                </button>
              </div>
            </div>

            {/* Daily Focus */}
            <div className="mb-6">
              <h2 className="text-3xl font-black text-game-dark mb-2 leading-tight italic">{todayWorkout.focus}</h2>
              <div className="flex items-center gap-3 text-sm">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${tagInfo.classes}`}>
                  {tagInfo.text}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 font-medium">{currentExercises.length} Exercícios</span>
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-3">
              {currentExercises.map((ex, idx) => (
                <ExerciseCard 
                  key={ex.id} 
                  exercise={ex} 
                  index={idx} 
                  isCompleted={!!sessionData[ex.id]?.completed}
                  weight={sessionData[ex.id]?.weight || ''}
                  onToggleComplete={() => handleToggleExercise(ex.id)}
                  onWeightChange={(val) => handleWeightChange(ex.id, val)}
                  isRestDay={todayWorkout.isRestDay}
                />
              ))}
            </div>

            {/* Finish Button */}
            <div className="fixed bottom-[88px] left-0 right-0 max-w-xl mx-auto px-6 z-30 pointer-events-none">
              <div className="pointer-events-auto shadow-2xl shadow-game-dark/10 rounded-xl">
                <button 
                  onClick={handleFinishWorkout}
                  disabled={!isWorkoutComplete}
                  className={`
                    w-full py-4 font-black rounded-xl text-lg transition-all flex items-center justify-center gap-3 border uppercase tracking-wide
                    ${isWorkoutComplete 
                      ? 'bg-game-dark hover:bg-gray-800 text-white cursor-pointer active:scale-[0.98] border-game-dark' 
                      : 'bg-white/95 text-gray-400 cursor-not-allowed border-game-dim backdrop-blur-md'}
                  `}
                >
                  {isWorkoutComplete ? <CheckCircle2 className="text-white" /> : <Lock size={20} />}
                  {todayWorkout.isRestDay 
                    ? 'Registrar Descanso' 
                    : isWorkoutComplete ? 'CONCLUIR TREINO' : 'Complete todos os itens'}
                </button>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'stats' && (
          <StatsView 
            userProgress={userProgress} 
            workoutHistory={workoutHistory}
            onReset={handleResetData}
            onChangePlan={handleChangePlan}
          />
        )}
      </main>

      {/* Floating Timer */}
      {activeTab === 'workout' && !todayWorkout.isRestDay && (
        <Timer />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-game-light/95 backdrop-blur border-t border-game-dim flex justify-around items-center p-2 pb-6 z-50 max-w-xl mx-auto">
        <button 
          onClick={() => setActiveTab('workout')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-24 ${
            activeTab === 'workout' ? 'text-game-dark' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Activity className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Treinar</span>
        </button>
        
        {/* Footer Logo */}
        <div className="opacity-20 hover:opacity-100 transition-opacity w-8 h-8">
            <img src={logo} className="w-full h-full object-contain" alt="GameFit" />
        </div>

        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-24 ${
            activeTab === 'stats' ? 'text-game-dark' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Progresso</span>
        </button>
      </nav>

      {/* NPS Modal */}
      <NPSModal 
        isOpen={showNPS} 
        onClose={() => setShowNPS(false)} 
        onSubmit={handleSubmitNPS} 
      />
    </div>
  );
}
