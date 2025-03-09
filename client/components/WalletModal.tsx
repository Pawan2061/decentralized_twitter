import { useConnect, useSwitchChain } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, connectors, isPending } = useConnect();
  const { switchChain } = useSwitchChain();
  if (!connect) {
    console.error("connect function is not available");
    return;
  }
  console.log(isPending, "pending and ");

  const handleConnect = async (connector: any) => {
    try {
      await connect({ connector });
      console.log("Wallet connected successfully");

      if (switchChain) {
        console.log("Switching chain...");
        await switchChain({ chainId: 11155111 });
      } else {
        console.error("switchChain function is not available");
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      console.log("Error details:", error.message, error.stack);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => handleConnect(connector)}
              disabled={isPending}
              className="w-full justify-start gap-4 bg-white hover:bg-gray-100 text-black border"
            >
              {connector.name === "MetaMask" && (
                <img src="/metamask.svg" alt="MetaMask" className="w-6 h-6" />
              )}
              {connector.name === "Coinbase Wallet" && (
                <img src="/coinbase.svg" alt="Coinbase" className="w-6 h-6" />
              )}
              {connector.name === "WalletConnect" && (
                <img
                  src="/walletconnect.svg"
                  alt="WalletConnect"
                  className="w-6 h-6"
                />
              )}
              {connector.name}
              {isPending && " (connecting)"}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
