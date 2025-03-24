import { cn } from "@/lib/utils";
import {
  IconShieldLock,
  IconWorld,
  IconCurrencyEthereum,
  IconClock,
  IconUsers,
  IconHelp,
  IconBroadcast,
  IconMessageCircle,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Truly Decentralized",
      description:
        "Every post and profile is stored on the Ethereum blockchain. No single entity controls your data.",
      icon: <IconShieldLock />,
    },
    {
      title: "Global Accessibility",
      description:
        "Accessible from anywhere in the world without restrictions. No censorship, no limitations.",
      icon: <IconWorld />,
    },
    {
      title: "Crypto-Powered",
      description:
        "Transactions and interactions are backed by Ethereum, ensuring transparency and security.",
      icon: <IconCurrencyEthereum />,
    },
    {
      title: "Permanent & Uncensorable",
      description:
        "Once posted, always available. Your words cannot be taken down by centralized authorities.",
      icon: <IconClock />,
    },
    {
      title: "Community-Owned",
      description:
        "Users govern the platform. No corporations, only decentralized decision-making.",
      icon: <IconUsers />,
    },
    {
      title: "24/7 Support",
      description:
        "Our community and AI agents are here to help you around the clock.",
      icon: <IconHelp />,
    },
    {
      title: "On-Chain Broadcasting",
      description:
        "Every tweet-like post is recorded on-chain, making it verifiable and immutable.",
      icon: <IconBroadcast />,
    },
    {
      title: "Smart Contracts for Engagement",
      description:
        "Likes, retweets, and follows are executed via smart contracts, ensuring fairness.",
      icon: <IconMessageCircle />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
