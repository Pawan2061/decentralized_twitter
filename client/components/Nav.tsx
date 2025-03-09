"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";
import { useAccount } from "wagmi";
import { useState } from "react";
import { WalletModal } from "./WalletModal";
import { ProfileModal } from "../components/ui/profileModal";
import { User2 } from "lucide-react";
import { useTabStore } from "@/store/useTabStore";

export default function Nav() {
  const { isConnected } = useAccount();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { selectedTab, setSelectedTab } = useTabStore();

  return (
    <>
      <div className="relative top-0 left-0 right-0 border-b bg-white/75 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center px-4 py-2 sm:py-0 sm:h-14 space-y-2 sm:space-y-0">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg" />
            <span className="font-semibold text-lg sm:text-xl">Mirror</span>
          </Link>

          {isConnected ? (
            <>
              <div className="flex-1 flex justify-center w-full sm:w-auto">
                <Tabs
                  defaultValue={selectedTab}
                  onValueChange={(value) => setSelectedTab(value)}
                  className="w-full max-w-[400px]"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="inbox">Inbox</TabsTrigger>
                    <TabsTrigger value="explore">Explore</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  className="p-0 h-auto"
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <User2 className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </Button>
                <Button
                  size="sm"
                  className="sm:size-default bg-[#007AFF] hover:bg-[#007AFF]/90"
                >
                  Create
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex justify-end">
              <Button
                onClick={() => setIsWalletModalOpen(true)}
                className="bg-[#007AFF] hover:bg-[#007AFF]/90"
              >
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
