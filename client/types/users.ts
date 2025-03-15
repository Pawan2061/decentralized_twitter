interface UserProfile {
  user: string;
  name: string;
  bio: string;
  premium: boolean;
}

export type ProfileList = UserProfile[];
