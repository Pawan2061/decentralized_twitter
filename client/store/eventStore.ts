import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface EventState {
  events: string[];
  addEvent: (event: string) => void;
  removeEvent: (event: string) => void;
  clearEvents: () => void;
}

const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [],

      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),

      removeEvent: (event) =>
        set((state) => ({
          events: state.events.filter((e) => e !== event),
        })),

      clearEvents: () => set({ events: [] }),
    }),
    {
      name: "event-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useEventStore;
