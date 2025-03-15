import { Button } from "./button";
import ProfileCard from "./profile-card";

export default function Suggestions() {
  return (
    <div className="flex-1/3 border border-gray-200 border-r-0 border-b-0  h-screen overflow-y-auto scroll-auto p-5">
      <h1 className="text-xl"> Suggestions</h1>
      <h1 className="text-md font-medium">
        Get your DTwitter mates here,Subscribe to other users for future updates
      </h1>
      <div className="space-y-6 w-full">
        {[...Array(9).slice(0, 5).keys()].map((index) => (
          <ProfileCard key={index} />
        ))}
      </div>

      <Button className="w-full bg-[#007AFF26] text-black hover:bg-gray-50">
        Subscribe to all{" "}
      </Button>
    </div>
  );
}
