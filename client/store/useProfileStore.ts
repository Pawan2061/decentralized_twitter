import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserProfile {
  user: string;
  name: string;
  premium: boolean;
  bio: string;
}

interface ProfileState {
  profiles: Record<string, UserProfile>;
  setProfile: (address: string, profile: Partial<UserProfile>) => void;
  getProfile: (address: string) => UserProfile | null;
  clearProfile: (address: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: {},

      setProfile: (address, profile) => {
        if (!address) return;

        const lowerAddress = address.toLowerCase();
        set((state) => ({
          profiles: {
            ...state.profiles,
            [lowerAddress]: {
              user: profile.user || lowerAddress,
              name: profile.name || "",
              bio: profile.bio || "",
              premium: profile.premium || false,
            },
          },
        }));
      },

      getProfile: (address) => {
        if (!address) return null;

        const lowerAddress = address.toLowerCase();
        const state = get();
        return state.profiles[lowerAddress] || null;
      },

      clearProfile: (address) => {
        if (!address) return;

        const lowerAddress = address.toLowerCase();
        set((state) => {
          const { [lowerAddress]: _, ...rest } = state.profiles;
          return { profiles: rest };
        });
      },
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
