import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ColorState {
  selectedColor: string;
  setColor: (color: string) => void;
}

const useColorStore = create<ColorState>()(
  persist(
    (set) => ({
      selectedColor: "blue",
      setColor: (color) => set({ selectedColor: color }),
    }),
    {
      name: "color-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useColorStore;
