import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

// Fallback to public RPC if env variables are not set
const SEPOLIA_RPC =
  process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";
const MAINNET_RPC =
  process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "https://eth.llamarpc.com";

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(MAINNET_RPC),
    [sepolia.id]: http(SEPOLIA_RPC),
  },
});
