import { UserProgressData, WorkoutHistoryItem } from '../types';

// Simple key generation
const generateId = () => Math.random().toString(36).substr(2, 9);

class StorageEntity<T extends { id?: string }> {
  private key: string;

  constructor(key: string) {
    this.key = `fitquest_${key}`;
  }

  list(orderBy?: string, limit?: number): Promise<T[]> {
    return new Promise((resolve) => {
      const dataStr = localStorage.getItem(this.key);
      let data: T[] = dataStr ? JSON.parse(dataStr) : [];
      
      // Simple sorting (simulated)
      if (orderBy === '-created_date' || orderBy === '-date') {
        data.sort((a: any, b: any) => 
          new Date(b.date || b.created_date || 0).getTime() - new Date(a.date || a.created_date || 0).getTime()
        );
      }

      if (limit) {
        data = data.slice(0, limit);
      }
      
      resolve(data);
    });
  }

  create(item: T): Promise<T> {
    return new Promise((resolve) => {
      const dataStr = localStorage.getItem(this.key);
      const data: T[] = dataStr ? JSON.parse(dataStr) : [];
      const newItem = { ...item, id: generateId(), created_date: new Date().toISOString() };
      data.push(newItem);
      localStorage.setItem(this.key, JSON.stringify(data));
      resolve(newItem);
    });
  }

  update(id: string, updates: Partial<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const dataStr = localStorage.getItem(this.key);
      const data: T[] = dataStr ? JSON.parse(dataStr) : [];
      const index = data.findIndex(d => d.id === id);
      
      if (index === -1) {
        reject(new Error("Item not found"));
        return;
      }

      data[index] = { ...data[index], ...updates };
      localStorage.setItem(this.key, JSON.stringify(data));
      resolve(data[index]);
    });
  }

  // Helper for reset feature
  clear(): void {
    localStorage.removeItem(this.key);
  }
}

// Mimic the base44 structure
export const base44 = {
  entities: {
    WorkoutHistory: new StorageEntity<WorkoutHistoryItem>('workout_history'),
    UserProgress: new StorageEntity<UserProgressData>('user_progress'),
  },
  // Placeholder for integrations used in original code
  integrations: {
    Core: {
      GenerateImage: async ({ prompt }: { prompt: string }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Return a functional but placeholder-based URL since we don't have a real backend key
        // We use the prompt text to generate a unique-looking placeholder
        const textSeed = prompt.split(':')[1]?.split('.')[0] || 'Exercise';
        return { 
          url: `https://placehold.co/600x400/1e293b/4f46e5?text=${encodeURIComponent(textSeed.trim().substring(0, 20))}&font=roboto`
        };
      }
    }
  }
};