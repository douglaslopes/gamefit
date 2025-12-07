export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  description: string;
  muscleGroup: string;
  imageUrl: string;
}

export interface DaySchedule {
  dayName: string;
  focus: string;
  isRestDay: boolean;
  exercisesHome: Exercise[];
  exercisesGym: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  minWorkoutsToUnlock: number; // Mantido para compatibilidade, mas usaremos workoutsToFinish
  workoutsToFinish: number; // Nova meta: 14, 21, 30
  schedule: DaySchedule[];
}

export interface UserProgressData {
  id?: string;
  name?: string;
  total_workouts: number;
  current_streak: number;
  last_workout_date?: string;
  unlocked_level_id: string;
  level_history: Record<string, number>; // Rastreia treinos por nível (ex: {'nivel_1': 5})
}

export interface WorkoutHistoryItem {
  id?: string;
  date: string;
  nps: number;
  workout_focus: string;
  exercises_completed: Array<{
    exercise_id: string;
    weight: string;
  }>;
}

export interface MotivationQuote {
  quote: string;
}

export type LocationType = 'home' | 'gym';
