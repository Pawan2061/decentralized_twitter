import { ProfileList } from "@/types/users";
import { Button } from "./button";
import ProfileCard from "./profile-card";

interface SuggestionsProps {
  profiles: ProfileList;
}

export default function Suggestions({ profiles }: SuggestionsProps) {
  return (
    <div className="w-full rounded-lg border border-gray-200 shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 max-h-screen overflow-y-auto p-3 sm:p-4 md:p-5">
      <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
        Suggestions
      </h1>
      <h2 className="text-xs sm:text-sm md:text-base font-medium text-gray-600 dark:text-gray-300">
        Get your DTwitter mates here, Subscribe to other users for future
        updates
      </h2>

      <div className="space-y-3 md:space-y-4 w-full mt-4 max-h-72 sm:max-h-80 md:max-h-96 overflow-y-auto pr-1">
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <ProfileCard key={profile.user || index} profile={profile} />
          ))
        ) : (
          <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              No profiles available
            </p>
          </div>
        )}
      </div>

      <Button className="w-full mt-4 bg-blue-100 hover:bg-blue-200 text-black dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white font-medium text-sm sm:text-base py-2 rounded-lg transition-colors">
        Subscribe to all
      </Button>
    </div>
  );
}
