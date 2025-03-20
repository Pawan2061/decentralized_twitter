export interface UserProfile {
  user: string;
  name: string;
  bio: string;
  premium: boolean;
  followers: string[];
}

export type ProfileList = UserProfile[];
