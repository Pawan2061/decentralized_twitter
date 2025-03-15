import React from "react";
import { Bell } from "lucide-react";
import { UserProfile } from "@/types/users";

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-white flex items-center justify-between p-4 rounded-lg shadow-sm w-full relative">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={
              profile.user
                ? `https://api.dicebear.com/7.x/identicon/svg?seed=${profile.user}`
                : "/api/placeholder/48/48"
            }
            alt={profile.name || "Profile avatar"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-800">
            {profile.name || "Unknown"}
          </h2>
          <p className="text-gray-500 text-xs truncate max-w-xs">
            {profile.user || "No address"}
          </p>
        </div>
      </div>

      <div className="pr-1">
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full h-10 w-10 flex items-center justify-center">
          <Bell size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
