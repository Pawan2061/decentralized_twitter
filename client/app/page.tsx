"use client";
import { useTabStore } from "@/store/useTabStore";
import Explore from "@/components/explore";
import { useAccount } from "wagmi";
import Landing from "@/components/landing";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { selectedTab } = useTabStore();

  if (!isConnected) {
    return <Landing />;
  }

  return (
    <div className="container mx-auto">
      {selectedTab === "explore" ? <Explore /> : null}
    </div>
  );
}
