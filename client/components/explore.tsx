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
import { holesky } from "wagmi/chains";
import DecentralizedTwitterABI from "../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";
import { CreatePostDialog } from "./create-post-dialog";
import { getFromIPFS } from "@/lib/ipfs";
import type { Post, PostMetadata } from "@/types/post";

interface PostWithMetadata extends Post {
  metadata?: PostMetadata;
}

const CONTRACT_ADDRESS = "0xD6717486981519F8904A5FEC8324B1D7def11682";

export default function Explore() {
  const { address, isConnecting: isWalletConnecting } = useAccount();
  const chainId = useChainId();
  const [likeError, setLikeError] = useState("");
  const [postsWithMetadata, setPostsWithMetadata] = useState<
    PostWithMetadata[]
  >([]);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

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
    chainId: holesky.id,
    account: address,
  });

  // Fetch metadata for all posts
  useEffect(() => {
    async function fetchMetadata() {
      if (!posts || (posts as Post[]).length === 0) return;

      setIsLoadingMetadata(true);
      try {
        const postsArray = posts as Post[];
        const postsWithData = await Promise.all(
          postsArray.map(async (post) => {
            try {
              const metadata = await getFromIPFS(post.contentId);
              return { ...post, metadata };
            } catch (error) {
              console.error(
                `Error fetching metadata for post ${post.id}:`,
                error
              );
              return post;
            }
          })
        );
        setPostsWithMetadata(postsWithData);
      } catch (error) {
        console.error("Error fetching post metadata:", error);
      } finally {
        setIsLoadingMetadata(false);
      }
    }

    fetchMetadata();
  }, [posts]);

  console.log("Contract Address:", CONTRACT_ADDRESS);
  console.log(
    "ABI getPosts:",
    DecentralizedTwitterABI.abi.find((item) => item.name === "getPosts")
  );
  console.log("Chain ID:", chainId);
  console.log("Expected Chain ID:", holesky.id);
  console.log("Read Contract Status:", status);
  console.log("Wallet Address:", address);
  console.log("Contract Error:", contractError);

  const isNoPostsError = contractError?.message?.includes("No posts found");
  const shouldShowNoPosts =
    !posts || (posts as Post[]).length === 0 || isNoPostsError;

  console.log(
    {
      isWalletConnecting,
      chainId,
      currentChain: holesky.id,
      isPostsLoading,
      isError,
      contractError,
      isNoPostsError,
      posts,
      shouldShowNoPosts,
    },
    "Contract read state"
  );

  const { writeContract: likePost } = useWriteContract();

  useEffect(() => {
    console.log("Current posts state:", {
      posts,
      isPostsLoading,
      isError,
      contractError,
      shouldShowNoPosts,
    });
  }, [posts, isPostsLoading, isError, contractError, shouldShowNoPosts]);

  const handleLikePost = async (postId: number) => {
    try {
      setLikeError("");
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

  const handlePostCreated = () => {
    console.log("Post created, should refresh the list");
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

  if (chainId !== holesky.id) {
    return (
      <div className="text-center p-8">
        <p className="text-yellow-500">
          Please switch to the Holesky network to view posts
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

  if (isPostsLoading || isLoadingMetadata) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-gray-500">
          {isLoadingMetadata ? "Loading post content..." : "Loading posts..."}
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
          <div className="text-center p-8 space-y-4">
            <p className="text-gray-500">
              No posts yet. Be the first one to post!
            </p>
            <CreatePostDialog
              trigger={
                <Button className="flex items-center gap-2">
                  <PenSquare className="h-4 w-4" />
                  Create Post
                </Button>
              }
              onPostCreated={handlePostCreated}
            />
          </div>
        ) : (
          postsWithMetadata.map((post) => (
            <Card key={post.id.toString()} className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                  {post.author.slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold">
                    {post.author.slice(0, 6)}...{post.author.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(Number(post.timeStamp) * 1000).toLocaleString()}
                  </p>
                </div>
              </div>

              {post.metadata ? (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">
                    {post.metadata.title}
                  </h2>
                  <p className="text-gray-700">{post.metadata.description}</p>
                  {post.metadata.images && post.metadata.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {post.metadata.images.map((imageCid, index) => (
                        <img
                          key={index}
                          src={`https://gateway.pinata.cloud/ipfs/${imageCid}`}
                          alt={`Image ${index + 1}`}
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">Content not available</p>
              )}

              <div className="flex justify-end mt-4">
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

      {!shouldShowNoPosts && (
        <CreatePostDialog
          trigger={
            <Button className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0">
              <PenSquare className="h-6 w-6" />
            </Button>
          }
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
}
