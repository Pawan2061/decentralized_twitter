"use client";
import Activity from "./ui/activity";
import Suggestions from "./ui/suggestions";
import { useProfileStore } from "@/store/useProfileStore";
import { ProfileList } from "@/types/users";

export default function Inbox() {
  const { getAllProfiles } = useProfileStore();
  const localProfiles: ProfileList = getAllProfiles();

  console.log(localProfiles, "Local profiles from Zustand");

  return (
    <section className="px-1 sm:px-3 md:px-4 flex flex-col md:flex-row w-full gap-4 md:gap-6 max-w-7xl mx-auto">
      <div className="w-full md:w-2/3">
        <Activity />
      </div>
      <div className="w-full md:w-1/3">
        <Suggestions profiles={localProfiles} />
      </div>
    </section>
  );
}
