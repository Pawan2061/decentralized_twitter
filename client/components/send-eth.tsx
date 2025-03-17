"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Wallet } from "lucide-react";
import { useId } from "react";
import { parseEther } from "viem";
import { useSendTransaction } from "wagmi";
interface sendEthProps {
  postId: number;
  address: any;
  onClose: () => void;
}
function EthSendDialog({
  postId,
  author,
  onClose,
}: {
  postId: number;
  author: string;
  onClose: () => void;
}) {
  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const id = useId();
  console.log("okay address, is", author);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const amount = event.target.elements[`amount-${id}`].value;
    const address = event.target.elements[`address-${id}`].value;
    sendTransaction({ to: address, value: parseEther(amount) });

    onClose();
  };
  if (isPending) {
    return <>loading...</>;
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <Wallet className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Send ETH</DialogTitle>
            <DialogDescription className="text-left">
              Send ETH to the creator of this post.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`amount-${id}`}>Amount (ETH)</Label>
              <Input
                id={`amount-${id}`}
                type="number"
                step="0.001"
                min="0.001"
                placeholder="0.05"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`address-${id}`}>ETH Address</Label>
              <div className="relative">
                <Input
                  id={`address-${id}`}
                  type="text"
                  defaultValue={author}
                  placeholder="0x..."
                  disabled
                  required
                  className="peer [direction:inherit]"
                />

                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Send size={16} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              Send ETH
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { EthSendDialog };
