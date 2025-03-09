import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import {
  injected,
  coinbaseWallet,
  walletConnect,
  metaMask,
} from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http("https://mainnet.example.com"),
    [sepolia.id]: http("https://sepolia.example.com"),
  },
});
