import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import decentralizedAbi from "../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";
import { getFromIPFS, getIPFSImageUrl } from "../lib/ipfs";
import { PostMetadata, PostwithSingleMetadata } from "@/types/post";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

type PostWithMetadata = {
  id: bigint;
  contentId: string;
  author: string;
  likes: bigint;
  timeStamp: bigint;
  metadata?: PostwithSingleMetadata;
  imageUrl?: string;
};

export default function UserPosts() {
  const { address } = useAccount();
  const [postsWithMetadata, setPostsWithMetadata] = useState<
    PostWithMetadata[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: postIds,
    isLoading: isPostsLoading,
    isError,
    error: contractError,
  } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: decentralizedAbi.abi,
    functionName: "getUserPosts",
    account: address,
    args: [address],
  });

  const { data: posts, isLoading: isPostsDetailsLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: decentralizedAbi.abi,
    functionName: "getPosts",
    args: [],
  });

  useEffect(() => {
    async function fetchPostsMetadata() {
      if (!isPostsLoading && !isPostsDetailsLoading && posts && postIds) {
        try {
          setIsLoading(true);

          const postIdsArray = Array.isArray(postIds) ? postIds : [];
          const postsArray = Array.isArray(posts) ? posts : [];

          const userPosts = postsArray.filter((post) =>
            postIdsArray.map((id) => id.toString()).includes(post.id.toString())
          );

          const postsWithData = await Promise.all(
            userPosts.map(async (post): Promise<PostWithMetadata> => {
              try {
                const metadata = await getFromIPFS(post.contentId);
                let imageUrl = "";

                if (metadata.images && metadata.images.length > 0) {
                  imageUrl = getIPFSImageUrl(metadata.images[0]);
                }

                return {
                  ...post,
                  metadata,
                  imageUrl,
                };
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
          setIsLoading(false);
        }
      }
    }

    fetchPostsMetadata();
  }, [posts, postIds, isPostsLoading, isPostsDetailsLoading]);

  return (
    <div className="max-w-6xl my-10">
      <div className="left-0 text-4xl font-semibold max-w-4xl mb-6">
        Explore more updates from the user
      </div>

      {isLoading ? (
        <div>Loading posts...</div>
      ) : postsWithMetadata.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {postsWithMetadata.map((post) => (
            <div
              key={post.id.toString()}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {post.metadata && (
                <>
                  <h3 className="font-bold text-xl mb-2">
                    {post.metadata.title}
                  </h3>
                  {post.imageUrl && (
                    <div className="mb-3">
                      <img
                        src={post.imageUrl}
                        alt={post.metadata.title || "Post image"}
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  )}
                  <p className="text-gray-800 mb-3">
                    {post.metadata.description}
                  </p>
                  {post.metadata.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.metadata.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <p>Likes: {post.likes.toString()}</p>
                <p>
                  {new Date(Number(post.timeStamp) * 1000).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-lg">No posts found</div>
      )}
    </div>
  );
}
