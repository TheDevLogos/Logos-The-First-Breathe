import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type MemoryChoice = 'share' | 'keep' | null;

interface GamePreferences {
  reducedMotion: boolean;
  choice: MemoryChoice;
  setReducedMotion: (reducedMotion: boolean) => void;
  setChoice: (choice: Exclude<MemoryChoice, null>) => void;
}

export const useGameStore = create<GamePreferences>()(
  persist(
    (set) => ({
      reducedMotion: false,
      choice: null,
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setChoice: (choice) => set({ choice }),
    }),
    {
      name: 'logos-game-preferences',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ reducedMotion, choice }) => ({ reducedMotion, choice }),
    },
  ),
);
