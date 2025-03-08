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
    struct UserProfile {
        address user;
        string name;
        string avatar;
        bool premium;
        string bio;
    }

    mapping(address => UserProfile) public userProfile;
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
    event Unfollowed(address indexed follower, address indexed unfollower);
    event TipSent(address indexed from, address indexed to, uint amount);
    event UserFollowed(address indexed user, address indexed following);

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

    function unfollowUser(address _user) public {
        require(_user != msg.sender, "You cannot unfollow yourself");
        require(followers[_user][msg.sender], "Not Following");
        followers[_user][msg.sender] = false;
        emit Unfollowed(_user, msg.sender);
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

    function sendTip(address payable _to) public payable {
        require(msg.value > 0, "Tip should be greater than zero");
        require(_to != msg.sender, "you cannot tip yourself");
        _to.transfer(msg.value);
        emit TipSent(msg.sender, _to, msg.value);
    }

    function deletePost(uint256 _postId) public {
        require(
            posts[_postId].author == msg.sender,
            "You can only delete your posts"
        );
        delete posts[_postId];
    }
    function updatePost(uint256 _postId, string memory _newContentId) public {
        require(
            posts[_postId].author == msg.sender,
            "You can only edit your posts"
        );
        posts[_postId].contentId = _newContentId;
    }
}
