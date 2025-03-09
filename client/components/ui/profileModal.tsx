"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CopyIcon,
  ExternalLinkIcon,
  LogOutIcon,
  SettingsIcon,
  User2Icon,
} from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";

export function ProfileModal({ isOpen, onClose }: any) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const truncateAddress = (address: any) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>
            Manage your account and wallet settings
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4 space-y-4">
          <Avatar className="h-20 w-20 bg-emerald-500">
            <AvatarFallback>
              <User2Icon className="h-10 w-10 text-white" />
            </AvatarFallback>
            <AvatarImage src="" />
          </Avatar>

          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-lg">Account</h3>
            <div className="flex items-center mt-1 space-x-2">
              <code className="bg-muted px-2 py-1 rounded text-sm">
                {truncateAddress(address)}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="h-8 w-8"
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-600 mt-1">Address copied!</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" className="justify-start">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </Button>

          <Button variant="outline" className="justify-start">
            <ExternalLinkIcon className="mr-2 h-4 w-4" />
            View on Explorer
          </Button>

          <Button
            variant="destructive"
            className="justify-start mt-2"
            onClick={() => {
              disconnect();
              onClose();
            }}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Disconnect Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
