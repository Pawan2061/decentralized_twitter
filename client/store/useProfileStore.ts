import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  // id: number;
  user: string;
  name: string;
  premium: boolean;
  bio: string;
}

interface ProfileState {
  profiles: Record<string, UserProfile>;
  setProfile: (address: string, profile: UserProfile) => void;
  getProfile: (address: string) => UserProfile | null;
  clearProfile: (address: string) => void;
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  profiles: {},
  setProfile: (address, profile) =>
    set((state) => ({
      profiles: {
        ...state.profiles,
        [address.toLowerCase()]: {
          ...profile,
          // id: Number(profile.id),
        },
      },
    })),

  getProfile: (address) => {
    const state = get();
    console.log(state.profiles, "address is here");

    return state.profiles[address.toLowerCase()] || null;
  },
  clearProfile: (address) =>
    set((state) => {
      const { [address.toLowerCase()]: _, ...rest } = state.profiles;
      return { profiles: rest };
    }),
}));
