"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import decentralizedTwitterAbi from "../../../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";
import { useParams, useRouter } from "next/navigation";
import { getFromIPFS, getIPFSImageUrl } from "@/lib/ipfs";
import { type PostMetadata } from "@/types/post";
import { Button } from "@/components/ui/button";
import useEventStore from "@/store/eventStore";
import { CircleDollarSign, Heart } from "lucide-react";
import { EthSendDialog } from "@/components/send-eth";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Post() {
  const { address } = useAccount();
  const params = useParams();
  const router = useRouter();
  const [postData, setPostData] = useState<PostMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addEvent } = useEventStore();
  const [activeDialogPostId, setActiveDialogPostId] = useState<number | null>(
    null
  );
  const [activeDialogAuthor, setActiveDialogAuthor] = useState<string | null>(
    null
  );

  const [likeError, setLikeError] = useState("");

  const { writeContract: likePost } = useWriteContract();

  const handleLikePost = async (postId: number) => {
    try {
      setLikeError("");
      likePost?.({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: decentralizedTwitterAbi.abi,
        functionName: "likePost",
        args: [postId],
      });
      addEvent(`${address} liked the post ${postId}`);
    } catch (err) {
      console.error("Error liking post:", err);
      setLikeError("Failed to like post. Please try again.");
    }
  };

  const handleOpenDialog = (postId: number, author: string) => {
    setActiveDialogPostId(postId);
    setActiveDialogAuthor(author);
  };

  const handleCloseDialog = () => {
    setActiveDialogPostId(null);
    setActiveDialogAuthor(null);
  };

  const { data: post }: any = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: decentralizedTwitterAbi.abi,
    functionName: "getPost",
    account: address,
    args: [params.id],
  });

  useEffect(() => {
    async function fetchPostData() {
      // @ts-ignore
      if (!post || !post?.contentId) {
        setIsLoading(false);
        return;
      }

      try {
        // @ts-ignore
        const data = await getFromIPFS(post.contentId);
        setPostData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching post data:", err);
        setError("Failed to load post content");
        setIsLoading(false);
      }
    }

    fetchPostData();
  }, [post]);

  const handleExit = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <section className="mx-auto px-20 my-2 max-w-4xl bg-gray-50 items-center rounded-2xl shadow-xl p-8 text-center relative">
        <button
          onClick={handleExit}
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Exit"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p>Loading post...</p>
      </section>
    );
  }

  if (error || !postData) {
    return (
      <section className="mx-auto px-20 my-2 max-w-4xl bg-gray-50 items-center rounded-2xl shadow-xl p-8 text-center relative">
        <button
          onClick={handleExit}
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Exit"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="text-red-500">{error || "Post not found"}</p>
      </section>
    );
  }

  const createdAt = new Date(Number(postData.createdAt));

  return (
    <section className="mx-auto px-20 py-8 my-2 max-w-4xl bg-gray-50 rounded-2xl shadow-xl overflow-y-auto relative">
      {activeDialogPostId !== null && activeDialogAuthor !== null && (
        <EthSendDialog
          postId={activeDialogPostId}
          author={activeDialogAuthor}
          onClose={handleCloseDialog}
        />
      )}

      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={handleExit}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Exit"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gray-200 rounded-full p-2">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <div className="font-medium">
            {/* @ts-ignore */}
            {post?.author
              ? post.author.slice(0, 6) + "..." + post.author.slice(-4)
              : "Unknown author"}
          </div>
          <div className="text-sm text-gray-500">
            {createdAt.toLocaleString()}
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>

      <div className="mb-8">
        <p className="text-lg whitespace-pre-wrap">{postData.description}</p>
      </div>

      {postData.images && postData.images.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mb-4">
          {postData.images.map((cid, index) => (
            <div key={index} className="relative h-96 w-full">
              <Image
                src={getIPFSImageUrl(cid)}
                alt={`Post image ${index + 1}`}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleLikePost(post.id)}
            className="flex items-center gap-1"
          >
            <Heart className="h-4 w-4" /> <span>{post.likes.toString()}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenDialog(post.id, post.author)}
            className="flex items-center gap-1"
          >
            <CircleDollarSign className="h-4 w-4" /> <span>Tip Author</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
