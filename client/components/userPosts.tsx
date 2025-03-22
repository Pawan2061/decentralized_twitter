import { useAccount, useReadContract } from "wagmi";
import decentralizedAbi from "../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function UserPosts() {
  const { address } = useAccount();

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

  const postIdsArray = Array.isArray(postIds) ? postIds : [];
  const postsArray = Array.isArray(posts) ? posts : [];

  const userPosts = postsArray.filter((post) =>
    postIdsArray.map((id) => id.toString()).includes(post.id.toString())
  );

  console.log(userPosts, "Filtered posts for user");

  return (
    <div className="max-w-6xl my-10">
      <div className="left-0 text-4xl font-semibold max-w-4xl">
        Explore more updates from the user
      </div>
      {isPostsLoading || isPostsDetailsLoading ? (
        <div>Loading posts...</div>
      ) : userPosts.length > 0 ? (
        userPosts.map((post) => (
          <div key={post.id.toString()} className="border p-4 my-2">
            <p>Post ID: {post.id.toString()}</p>
            <p>Content ID: {post.contentId}</p>
            <p>Author: {post.author}</p>
            <p>Likes: {post.likes.toString()}</p>
            <p>
              Timestamp:{" "}
              {new Date(Number(post.timeStamp) * 1000).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
}
