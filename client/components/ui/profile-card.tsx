import React from "react";
import { Bell } from "lucide-react";
import { UserProfile } from "@/types/users";
import decentralizedTwitterAbi from "../../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";
import { useAccount, useWriteContract } from "wagmi";
import { useProfileStore } from "@/store/useProfileStore";

interface ProfileCardProps {
  profile: UserProfile;
}

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { writeContract } = useWriteContract();
  const { addFollower } = useProfileStore();
  const { address } = useAccount();

  const handleClick = () => {
    console.log("okay clicked");

    if (!address) return;

    writeContract?.({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: decentralizedTwitterAbi.abi,
      functionName: "followUser",
      args: [profile.user],
    });

    if (profile.user && address) {
      addFollower(profile.user, address);
    }
  };

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
            {profile.user.slice(0, 6) || "No address"}
          </p>
        </div>
      </div>

      <div className="pr-1">
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full h-10 w-10 flex items-center justify-center"
        >
          <Bell size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
