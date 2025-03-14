import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Faq3Demo } from "./ui/faq";
import { FeatureCards } from "./ui/feature-card";
import { WalletModal } from "./WalletModal";
import { useRouter } from "next/navigation";

export default function Landing() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const router = useRouter();

  return (
    <section className="">
      <div className="bg-gray-50 shadow-2xs  flex flex-col items-center py-10">
        <div>
          <h1 className="text-[#007AFF] font-bold text-6xl max-w-2xl text-center">
            The home for web3 publishing
          </h1>
          <div className="p-6 flex justify-evenly ">
            <Button
              onClick={() => setIsWalletModalOpen(true)}
              className="bg-[#007AFF] hover:scale-105 p-6  hover:bg-[#008AFF] text-white"
            >
              Get Started
            </Button>
            <Button
              onClick={() => {
                router.push("/learn");
              }}
              className="bg-blue-300 hover:bg-blue-400 p-6 text-blue-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="px-8 py-6 mx-auto  max-w-6xl  ">
        <h1 className="text-black font-semibold text-4xl">
          Featured Materials
        </h1>
        <h1 className=" font-stretch-75% text-lg ">
          The most interesting thing collected by Dtwitter
        </h1>
        <FeatureCards />
        <Faq3Demo />
      </div>
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </section>
  );
}
