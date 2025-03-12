"use client";
import { useTabStore } from "@/store/useTabStore";
import Explore from "@/components/explore";

export default function Home() {
  const { selectedTab } = useTabStore();

  return (
    <div className="container mx-auto">
      {selectedTab === "explore" ? <Explore /> : null}
    </div>
  );
}
