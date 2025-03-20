import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserProfile {
  user: string;
  name: string;
  premium: boolean;
  bio: string;
  followers: string[];
}

interface ProfileState {
  profiles: Record<string, UserProfile>;
  setProfile: (address: string, profile: Partial<UserProfile>) => void;
  getProfile: (address: string) => UserProfile | null;
  clearProfile: (address: string) => void;
  getAllProfiles: () => UserProfile[];
  addFollower: (address: string, followerAddress: string) => void;
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
              followers: profile.followers || [],
            },
          },
        }));
      },

      getProfile: (address) => {
        if (!address) return null;

        const lowerAddress = address.toLowerCase();
        return get().profiles[lowerAddress] || null;
      },

      clearProfile: (address) => {
        if (!address) return;

        const lowerAddress = address.toLowerCase();
        set((state) => {
          const { [lowerAddress]: _, ...rest } = state.profiles;
          return { profiles: rest };
        });
      },

      getAllProfiles: () => Object.values(get().profiles),

      addFollower: (address, followerAddress) => {
        if (!address || !followerAddress) return;

        const lowerAddress = address.toLowerCase();
        const lowerFollowerAddress = followerAddress.toLowerCase();

        set((state) => {
          const profile = state.profiles[lowerAddress];

          if (!profile) return state;

          return {
            profiles: {
              ...state.profiles,
              [lowerAddress]: {
                ...profile,
                followers: profile.followers.includes(lowerFollowerAddress)
                  ? profile.followers
                  : [...profile.followers, lowerFollowerAddress],
              },
            },
          };
        });
      },
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
