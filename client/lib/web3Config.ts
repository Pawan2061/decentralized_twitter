import { http, createConfig } from "wagmi";
import { mainnet, sepolia, holesky } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

const localhost = {
  id: 31337,
  name: "Localhost Hardhat",
  network: "localhost",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
};

const SEPOLIA_RPC =
  process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";
const MAINNET_RPC =
  process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "https://eth.llamarpc.com";
const HOLESKY_RPC =
  process.env.NEXT_PUBLIC_HOLESKY_RPC_URL || "https://holesky.rpc.thirdweb.com";

export const config = createConfig({
  chains: [mainnet, sepolia, holesky, localhost],
  ssr: true,

  connectors: [metaMask()],

  transports: {
    [mainnet.id]: http(MAINNET_RPC),
    [sepolia.id]: http(SEPOLIA_RPC),
    [holesky.id]: http(HOLESKY_RPC),
    [localhost.id]: http("http://127.0.0.1:8545"),
  },
});

// "https://ethereum-holesky.publicnode.com";
