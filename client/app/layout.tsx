"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/web3Config";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();
// declare global {
//   interface BigInt {
//     toJSON(): string;
//   }
// }

// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <Nav />
            {children}
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
