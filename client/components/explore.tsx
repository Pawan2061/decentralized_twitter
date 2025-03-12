import { useState, useEffect } from "react";
import { Loader2, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useChainId,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import DecentralizedTwitterABI from "../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";

interface Post {
  id: number;
  author: string;
  contentId: string;
  timeStamp: number;
  likes: number;
}

const CONTRACT_ADDRESS = "0x8b39cD68dB11AcCD24DC2f5f0Df18b75F05f6Fb4"; // Contract address on Sepolia

export default function Explore() {
  const { address, isConnecting: isWalletConnecting } = useAccount();
  const chainId = useChainId();
  const [likeError, setLikeError] = useState("");

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError,
    error: contractError,
    status,
  } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: DecentralizedTwitterABI.abi,
    functionName: "getPosts",
    chainId: sepolia.id,
    account: address,
  });

  // Debug logs with more error details
  console.log("Contract Address:", CONTRACT_ADDRESS);
  console.log(
    "ABI getPosts:",
    DecentralizedTwitterABI.abi.find((item) => item.name === "getPosts")
  );
  console.log("Chain ID:", chainId);
  console.log("Expected Chain ID:", sepolia.id);
  console.log("Read Contract Status:", status);
  console.log("Wallet Address:", address);
  console.log("Contract Error:", contractError);

  // Add timeout handling for pending state
  const [isPendingTimeout, setIsPendingTimeout] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (status === "pending") {
      timeoutId = setTimeout(() => {
        setIsPendingTimeout(true);
        console.log("Contract read timed out after 10 seconds");
      }, 10000); // 10 seconds timeout
    } else {
      setIsPendingTimeout(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status]);

  // If contract reverts with "No posts found", treat it as empty posts
  const isNoPostsError = contractError?.message?.includes("No posts found");
  const shouldShowNoPosts =
    !posts || (posts as Post[]).length === 0 || isNoPostsError;

  console.log(
    {
      isWalletConnecting,
      chainId,
      currentChain: sepolia.id,
      isPostsLoading,
      isError,
      contractError,
      isNoPostsError,
      posts,
    },
    "Contract read state"
  );

  const { writeContract: likePost } = useWriteContract();

  const handleLikePost = async (postId: number) => {
    try {
      setLikeError(""); // Clear any previous errors
      likePost?.({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: DecentralizedTwitterABI.abi,
        functionName: "likePost",
        args: [postId],
      });
    } catch (err) {
      console.error("Error liking post:", err);
      setLikeError("Failed to like post. Please try again.");
    }
  };

  if (isWalletConnecting) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-gray-500">Connecting wallet...</p>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="text-center p-8">
        <p className="text-yellow-500">
          Please connect your wallet to view posts
        </p>
      </div>
    );
  }

  if (chainId !== sepolia.id) {
    return (
      <div className="text-center p-8">
        <p className="text-yellow-500">
          Please switch to the Sepolia network to view posts
        </p>
      </div>
    );
  }

  if (isError && !isNoPostsError) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">
          Error loading posts: {contractError?.message}
        </p>
      </div>
    );
  }

  if (isPostsLoading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-gray-500">Loading posts...</p>
      </div>
    );
  }

  if (isPendingTimeout) {
    return (
      <div className="text-center p-8">
        <p className="text-yellow-500">
          Taking too long to load posts. There might be an issue with the
          network or contract. Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Explore Posts</h1>
      {likeError && (
        <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-md">
          {likeError}
        </div>
      )}
      <div className="space-y-4">
        {shouldShowNoPosts ? (
          <div className="text-center p-8">
            <p className="text-gray-500">
              No posts yet. Be the first one to post!
            </p>
          </div>
        ) : (
          (posts as Post[])?.map((post: Post) => (
            <Card key={post.id.toString()} className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                  {post.author.slice(0, 2)}
                </div>
                <p className="font-bold">
                  {post.author.slice(0, 6)}...{post.author.slice(-4)}
                </p>
              </div>
              <p className="mb-2">{post.contentId}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {new Date(Number(post.timeStamp) * 1000).toLocaleString()}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center gap-1"
                >
                  ❤️ <span>{post.likes.toString()}</span>
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <Button
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0"
        onClick={() => {
          // We'll implement this in the next step
          console.log("Create post clicked");
        }}
      >
        <PenSquare className="h-6 w-6" />
      </Button>
    </div>
  );
}
