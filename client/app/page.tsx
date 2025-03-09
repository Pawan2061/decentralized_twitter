"use client";
import Nav from "@/components/Nav";
import { useTabStore } from "@/store/useTabStore";

export default function Home() {
  const { selectedTab } = useTabStore();
  return <div className="">{selectedTab}</div>;
}
