import { Faq3 } from "../blocks/faq3";
const demoData = {
  heading: "Frequently Asked Questions",
  description:
    "Everything you need to know about our decentralized Twitter. Can't find the answer you're looking for? Feel free to contact our support team.",
  items: [
    {
      id: "faq-1",
      question: "What is this decentralized Twitter?",
      answer:
        "Our decentralized Twitter is a social media platform where every post and profile is stored directly on the Ethereum blockchain, ensuring full ownership and censorship resistance.",
    },
    {
      id: "faq-2",
      question: "How does it work?",
      answer:
        "When you create a profile or post a tweet, the data is stored on the Ethereum blockchain. This means no central authority controls your content, and your posts remain immutable.",
    },
    {
      id: "faq-3",
      question: "Do I need cryptocurrency to use it?",
      answer:
        "Yes, since all data is stored on the blockchain, you need a small amount of ETH to cover gas fees for posting and updating your profile.",
    },
    {
      id: "faq-4",
      question: "Is my data truly secure?",
      answer:
        "Yes, blockchain technology ensures that your data is decentralized, tamper-proof, and owned entirely by you. No one can alter or delete your content without your permission.",
    },
    {
      id: "faq-5",
      question: "Can my account be banned or censored?",
      answer:
        "No, unlike traditional social media platforms, there is no central authority to ban or censor content. However, users can filter content based on preferences.",
    },
  ],
  supportHeading: "Still have questions?",
  supportDescription:
    "Can't find the answer you're looking for? Our support team is here to help with any technical questions or concerns.",
  supportButtonText: "Contact Support",
  supportButtonUrl: "https://your-decentralized-twitter-support.com",
};

function Faq3Demo() {
  return <Faq3 {...demoData} />;
}

export { Faq3Demo };
