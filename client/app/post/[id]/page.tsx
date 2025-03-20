"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, useReadContract } from "wagmi";
import decentralizedTwitterAbi from "../../../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";
import { useParams } from "next/navigation";
import { getFromIPFS, getIPFSImageUrl } from "@/lib/ipfs";
import { type PostMetadata } from "@/types/post";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Post() {
  const { address } = useAccount();
  const params = useParams();
  const [postData, setPostData] = useState<PostMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return (
      <section className="mx-auto px-20 my-2 max-w-4xl bg-gray-50 items-center rounded-2xl shadow-xl p-8 text-center">
        <p>Loading post...</p>
      </section>
    );
  }

  if (error || !postData) {
    return (
      <section className="mx-auto px-20 my-2 max-w-4xl bg-gray-50 items-center rounded-2xl shadow-xl p-8 text-center">
        <p className="text-red-500">{error || "Post not found"}</p>
      </section>
    );
  }

  const createdAt = new Date(Number(postData.createdAt));

  return (
    <section className="mx-auto px-20 py-8 my-2 max-w-4xl bg-gray-50 rounded-2xl shadow-xl overflow-y-auto">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gray-200 rounded-full p-2">
          {/* Author avatar placeholder */}
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
            {/* Show author address */}
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
    </section>
  );
}
