// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DecentralizedTwitter {
    struct Post {
        uint256 id;
        address author;
        string contentId;
        uint256 timeStamp;
        uint256 likes;
    }
    mapping(uint256 => Post) public posts;
    mapping(address => uint256[]) public userPosts;
    mapping(address => mapping(address => bool)) public followers;
    mapping(uint256 => address[]) public postLikes;

    uint public postCount;
    uint256[] public allPostIds;
    event PostCreated(
        uint256 indexed PostId,
        address indexed author,
        string ContentId,
        uint256 timestamp
    );
    event PostLiked(uint256 indexed postId, address indexed liker);
    event UserFollowed(address indexed follower, address indexed following);

    function createPost(string memory _contentId) public {
        postCount++;
        posts[postCount] = Post(
            postCount,
            msg.sender,
            _contentId,
            block.timestamp,
            0
        );
        userPosts[msg.sender].push(postCount);
        emit PostCreated(postCount, msg.sender, _contentId, block.timestamp);
    }

    function likePost(uint256 _postId) public {
        require(_postId > 0 && _postId <= postCount, "Post doesnt exist");
        for (uint256 i = 0; i < postLikes[_postId].length; i++) {
            require(
                postLikes[_postId][i] != msg.sender,
                "You already liked this post"
            );
        }
        posts[_postId].likes++;
        postLikes[_postId].push(msg.sender);
    }

    function followUser(address _user) public {
        require(msg.sender != _user, "You cannot follow yourself");

        require(!followers[msg.sender][_user], "Already followed");
        followers[msg.sender][_user] = true;
        emit UserFollowed(msg.sender, _user);
    }

    function getUserPosts(
        address _user
    ) public view returns (uint256[] memory) {
        return userPosts[_user];
    }
    function getPost(uint256 _postId) public view returns (Post memory) {
        require(_postId > 0 && _postId <= postCount, "Post doesnt exist");
        return posts[_postId];
    }
    function checkIfFollowing(
        address _follower,
        address _following
    ) public view returns (bool) {
        return followers[_follower][_following];
    }

    function deletePost() {}
    function updatePost() {}
}
