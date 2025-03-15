import Activity from "./ui/activity";
import Suggestions from "./ui/suggestions";
import { useAccount, useReadContract } from "wagmi";
import DecentralizedTwitterABI from "../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";
import { useProfileStore } from "@/store/useProfileStore";
import { ProfileList } from "@/types/users";

export default function Inbox() {
  const { getAllProfiles } = useProfileStore();
  const localProfiles: ProfileList = getAllProfiles();

  console.log(localProfiles, "Local profiles from Zustand");

  return (
    <section className="px-1 flex flex-col md:flex-row md:justify-around gap-6">
      <Activity />
      <Suggestions profiles={localProfiles} />
    </section>
  );
}
