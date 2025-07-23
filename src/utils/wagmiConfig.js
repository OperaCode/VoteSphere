import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

// 1. Create config directly using getDefaultConfig
export const wagmiConfig = getDefaultConfig({
  appName: "DAO Poll",
  projectId: "b76a3d2bf5adf72596a51e03411fe3ff", // your WalletConnect v2 project ID
  chains: [mainnet, polygon, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});

// 2. Export chains separately if needed
export const chains = [mainnet, polygon, optimism, arbitrum];
