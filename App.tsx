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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { PLANS, LEVEL_1_PLAN, MOTIVATIONAL_QUOTES, WORKOUT_TIPS } from './constants';
import { base44 } from './services/storage';
import ExerciseCard from './components/ExerciseCard';
import NPSModal from './components/NPSModal';
import StatsView from './components/StatsView';
import Timer from './components/Timer';

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
  const [logoError, setLogoError] = useState(false);

  // Daily motivation (random from constants)
  const [dailyMotivation] = useState(() => {
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    return { quote: randomQuote };
  });

  // Fetch user progress
  const { data: userProgressList = [] } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => UserProgress.list()
  });

  // Fetch workout history
  const { data: workoutHistory = [] } = useQuery({
    queryKey: ['workoutHistory'],
    queryFn: () => WorkoutHistory.list('-created_date', 100)
  });

  const userProgress = userProgressList[0] || null;

  // Create initial progress if needed
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

  // Initialize user progress if not exists
  useEffect(() => {
    if (userProgressList.length === 0 && !createProgressMutation.isPending) {
      createProgressMutation.mutate({
        total_workouts: 0,
        current_streak: 0,
        unlocked_level_id: 'iniciante_fundacao'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProgressList]);

  // Derived Values
  const currentPlan = PLANS.find(p => p.id === userProgress?.unlocked_level_id) || LEVEL_1_PLAN;
  const todayWorkout = currentPlan.schedule[selectedDayIndex];
  const currentExercises = location === 'home' ? todayWorkout.exercisesHome : todayWorkout.exercisesGym;
  
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Get tip for today's workout
  const todayTip = WORKOUT_TIPS[todayWorkout.focus] || 'Foque na técnica antes da carga!';

  // Tag styling based on workout type
  const getTagInfo = () => {
    if (todayWorkout.isRestDay) {
      return { 
        text: 'Recuperação', 
        classes: 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
      };
    }
    
    if (currentPlan.id === 'iniciante_fundacao') {
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

  // Check if workout is complete
  const isWorkoutComplete = useMemo(() => {
    if (todayWorkout.isRestDay) return true;
    if (currentExercises.length === 0) return true;
    return currentExercises.every(ex => sessionData[ex.id]?.completed);
  }, [currentExercises, sessionData, todayWorkout.isRestDay]);

  // Handlers
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

  const handleResetData = () => {
    base44.entities.UserProgress.clear();
    base44.entities.WorkoutHistory.clear();
    setSessionData({});
    queryClient.invalidateQueries();
    window.location.reload();
  };

  const handleSubmitNPS = async (score: number) => {
    const now = new Date().toISOString();
    
    // Calculate streak
    let newStreak = userProgress?.current_streak || 0;
    if (userProgress?.last_workout_date) {
      const lastDate = new Date(userProgress.last_workout_date);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 2) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    // Check for level unlocks
    const newTotal = (userProgress?.total_workouts || 0) + 1;
    let newUnlockedId = userProgress?.unlocked_level_id || 'iniciante_fundacao';
    
    const nextPlan = PLANS.find(p => 
      p.minWorkoutsToUnlock > (userProgress?.total_workouts || 0) && 
      p.minWorkoutsToUnlock <= newTotal
    );
    if (nextPlan) {
      newUnlockedId = nextPlan.id;
    }

    // Save workout history
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

    // Update user progress
    if (userProgress?.id) {
      await updateProgressMutation.mutateAsync({
        id: userProgress.id,
        data: {
          total_workouts: newTotal,
          current_streak: newStreak,
          last_workout_date: now,
          unlocked_level_id: newUnlockedId
        }
      });
    }

    setSessionData({});
    setShowNPS(false);
    setActiveTab('stats');
  };

  const nextUnlockLevel = PLANS.find(p => p.minWorkoutsToUnlock > (userProgress?.total_workouts || 0)) || null;

  return (
    <div className="min-h-screen bg-game-light text-game-dark max-w-xl mx-auto shadow-2xl overflow-hidden relative border-x border-game-dim">
      
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-game-light/95 backdrop-blur sticky top-0 z-40 border-b border-game-dim">
        <div className="flex items-center gap-3">
          {/* Logo Mark */}
          <div className={`w-10 h-10 rounded-xl border border-game-dark flex items-center justify-center shadow-lg relative overflow-hidden group ${logoError ? 'bg-game-dark' : 'bg-transparent'}`}>
            {!logoError ? (
              <img 
                src="./logo.png" 
                alt="GameFit Logo" 
                className="w-full h-full object-contain p-0.5"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-game-dark">
                <div className="relative z-10 font-black text-2xl italic tracking-tighter text-game-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                  G
                </div>
              </div>
            )}
          </div>
          
          {/* Logo Type */}
          <div>
            <h1 className="text-xl font-black italic tracking-tight text-game-dark leading-none">
              GAMEFIT
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">
              TREINE COM NÍVEIS
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-white pl-3 pr-4 py-1.5 rounded-full border border-game-dim shadow-sm">
          <Zap className="text-game-dark w-4 h-4 fill-game-dark" />
          <span className="font-mono font-bold text-sm text-game-dark">{userProgress?.current_streak || 0}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
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
            <div className="space-y-4">
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
            nextUnlockLevel={nextUnlockLevel} 
            onReset={handleResetData}
          />
        )}
      </main>

      {/* Floating Timer */}
      {activeTab === 'workout' && !todayWorkout.isRestDay && (
        <Timer />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-game-light/95 backdrop-blur border-t border-game-dim flex justify-around p-2 pb-6 z-50 max-w-xl mx-auto">
        <button 
          onClick={() => setActiveTab('workout')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-24 ${
            activeTab === 'workout' ? 'text-game-dark' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Activity className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Treinar</span>
        </button>
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