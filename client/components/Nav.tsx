"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { WalletModal } from "./WalletModal";
import { ProfileModal } from "../components/ui/profileModal";
import { User2, PenSquare } from "lucide-react";
import { useTabStore } from "@/store/useTabStore";
import { CreatePostDialog } from "./create-post-dialog";

export default function Nav() {
  const { isConnected } = useAccount();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { selectedTab, setSelectedTab } = useTabStore();

  const handlePostCreated = () => {
    // Switch to explore tab to see the new post
    setSelectedTab("explore");
  };

  return (
    <>
      <div className="relative top-0 left-0 right-0 border-b bg-white/75 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center px-4 py-2 sm:py-0 sm:h-14 space-y-2 sm:space-y-0">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg" />
            <span className="font-semibold text-lg sm:text-xl">DTwitter</span>
          </Link>

          {isConnected ? (
            <>
              <div className="flex-1 flex justify-center w-full sm:w-auto">
                <Tabs
                  defaultValue="explore"
                  value={selectedTab}
                  onValueChange={(value) => setSelectedTab(value)}
                  className="w-full max-w-[400px]"
                >
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="explore">Explore</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <Button
                  variant="ghost"
                  className="p-0 h-auto"
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <User2 className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </Button>
                <CreatePostDialog
                  trigger={
                    <Button
                      size="sm"
                      className="sm:size-default bg-[#007AFF] hover:bg-[#007AFF]/90 flex items-center gap-2"
                    >
                      <PenSquare className="h-4 w-4" />
                      Create Post
                    </Button>
                  }
                  onPostCreated={handlePostCreated}
                />
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
