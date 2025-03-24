import { User, ShieldCheck, Globe, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    id: 1,
    title: "Censorship-Resistant Communication",
    description:
      "No single entity controls your content. Speak freely without fear of takedowns.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Global Decentralized Network",
    description:
      "Powered by blockchain and distributed servers to ensure reliability and openness.",
    icon: Globe,
  },
  {
    id: 3,
    title: "User-Owned Identity",
    description:
      "Your profile is truly yours, portable across platforms without centralized restrictions.",
    icon: User,
  },
  {
    id: 4,
    title: "End-to-End Encryption",
    description:
      "Private messaging with full encryption ensures security and confidentiality.",
    icon: MessageCircle,
  },
];

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Decentralized Twitter</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-semibold text-left">
                The Future of Social Media
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                A censorship-resistant, community-driven alternative to
                traditional social platforms.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ id, title, description, icon: Icon }) => (
              <div
                key={id}
                className="bg-muted rounded-md p-6 flex justify-between flex-col aspect-square"
              >
                <Icon className="w-8 h-8 stroke-1" />
                <div className="flex flex-col">
                  <h3 className="text-xl tracking-tight">{title}</h3>
                  <p className="text-muted-foreground max-w-xs text-base">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
