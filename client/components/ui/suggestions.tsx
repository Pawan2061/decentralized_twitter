import { ProfileList } from "@/types/users";
import { Button } from "./button";
import ProfileCard from "./profile-card";

interface SuggestionsProps {
  profiles: ProfileList;
}

export default function Suggestions({ profiles }: SuggestionsProps) {
  return (
    <div className="w-full md:flex-1 border border-gray-200 border-r-0 border-b-0 max-h-screen md:h-screen  overflow-y-auto p-3 md:p-5">
      <h1 className="text-lg md:text-xl">Suggestions</h1>
      <h1 className="text-sm md:text-md font-medium">
        Get your DTwitter mates here, Subscribe to other users for future
        updates
      </h1>
      <div className="space-y-4 md:space-y-6 w-full mt-4">
        <div className="space-y-4 md:space-y-6 w-full mt-4">
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <ProfileCard key={profile.user || index} profile={profile} />
            ))
          ) : (
            <p className="text-gray-500">No profiles available</p>
          )}
        </div>
      </div>

      <Button className="w-full bg-blue-100 text-black hover:bg-gray-50 mt-4">
        Subscribe to all
      </Button>
    </div>
  );
}
