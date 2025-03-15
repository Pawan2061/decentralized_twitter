import Activity from "./ui/activity";
import { Button } from "./ui/button";
import ProfileCard from "./ui/profile-card";
import Suggestions from "./ui/suggestions";

export default function Inbox() {
  return (
    <section className=" px-3 flex justify-evenly">
      {/* <div className="flex-1/3 border border-gray-200 border-r-0 border-b-0  h-screen overflow-y-auto scroll-auto p-5">
        <h1 className="text-xl"> Suggestions</h1>
        <h1 className="text-md font-medium">
          Get your DTwitter mates here,Subscribe to other users for future
          updates
        </h1>
        {[...Array(9).slice(0, 5).keys()].map((index) => (
          <ProfileCard key={index} />
        ))}
        <Button className="w-full bg-[#007AFF26] text-black hover:bg-gray-50">
          Subscribe to all{" "}
        </Button>
      </div> */}
      <Activity />
      <Suggestions />
    </section>
  );
}
