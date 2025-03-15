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
        uint256 id;
        address user;
        string name;
        bool premium;
        string bio;
    }

    mapping(address => UserProfile) public userProfile;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => UserProfile) public users;
    mapping(address => uint256[]) public userPosts;
    mapping(address => mapping(address => bool)) public followers;
    mapping(uint256 => address[]) public postLikes;

    uint public postCount;
    uint public userCount;
    uint256[] public userIds;
    uint256[] public allPostIds;

    event PostCreated(
        uint256 indexed postId,
        address indexed author,
        string contentId,
        uint256 timestamp
    );
    event ProfileCreated(address indexed user, string name);
    event PostLiked(uint256 indexed postId, address indexed liker);
    event Unfollowed(address indexed follower, address indexed unfollower);
    event TipSent(address indexed from, address indexed to, uint amount);
    event UserFollowed(address indexed user, address indexed following);

    function createProfile(string memory _name, string memory _bio) public {
        require(bytes(_name).length > 0, "Name is required");
        require(
            userProfile[msg.sender].user == address(0),
            "Profile already exists"
        );

        userCount++;
        UserProfile memory newUser = UserProfile(
            userCount,
            msg.sender,
            _name,
            false,
            _bio
        );
        users[userCount] = newUser;
        userProfile[msg.sender] = newUser;
        userIds.push(userCount);

        emit ProfileCreated(msg.sender, _name);
    }

    function getProfile() public view returns (UserProfile memory) {
        require(
            userProfile[msg.sender].user != address(0),
            "Profile does not exist"
        );
        return userProfile[msg.sender];
    }

    function getAllProfiles() public view returns (UserProfile[] memory) {
        UserProfile[] memory allUsers = new UserProfile[](userIds.length);

        for (uint i = 0; i < userIds.length; i++) {
            allUsers[i] = users[userIds[i]];
        }
        return allUsers;
    }

    function enablePremium(uint256 _userId) public {
        require(msg.sender != address(0), "Invalid user");
        require(users[_userId].user != address(0), "User does not exist");
        users[_userId].premium = true;
    }

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
        allPostIds.push(postCount);

        emit PostCreated(postCount, msg.sender, _contentId, block.timestamp);
    }

    function likePost(uint256 _postId) public {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");

        for (uint256 i = 0; i < postLikes[_postId].length; i++) {
            require(
                postLikes[_postId][i] != msg.sender,
                "You already liked this post"
            );
        }

        posts[_postId].likes++;
        postLikes[_postId].push(msg.sender);
        emit PostLiked(_postId, msg.sender);
    }

    function followUser(address _user) public {
        require(msg.sender != _user, "You cannot follow yourself");
        require(!followers[msg.sender][_user], "Already following");

        followers[msg.sender][_user] = true;
        emit UserFollowed(msg.sender, _user);
    }

    function unfollowUser(address _user) public {
        require(msg.sender != _user, "You cannot unfollow yourself");
        require(followers[msg.sender][_user], "Not following this user");

        followers[msg.sender][_user] = false;
        emit Unfollowed(msg.sender, _user);
    }

    function getUserPosts(
        address _user
    ) public view returns (uint256[] memory) {
        return userPosts[_user];
    }

    function getPost(uint256 _postId) public view returns (Post memory) {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        return posts[_postId];
    }

    function getPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](allPostIds.length);
        for (uint i = 0; i < allPostIds.length; i++) {
            allPosts[i] = posts[allPostIds[i]];
        }
        return allPosts;
    }

    function checkIfFollowing(
        address _follower,
        address _following
    ) public view returns (bool) {
        return followers[_follower][_following];
    }

    function sendTip(address payable _to) public payable {
        require(msg.value > 0, "Tip should be greater than zero");
        require(_to != msg.sender, "You cannot tip yourself");

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

    function deleteProfile() public {
        require(
            userProfile[msg.sender].user != address(0),
            "Profile does not exist"
        );

        delete userProfile[msg.sender];

        for (uint i = 0; i < userIds.length; i++) {
            if (users[userIds[i]].user == msg.sender) {
                delete users[userIds[i]];
                userIds[i] = userIds[userIds.length - 1];
                userIds.pop();
                break;
            }
        }
    }

    function updateProfile(string memory _name, string memory _bio) public {
        UserProfile storage profile = userProfile[msg.sender];
        profile.name = _name;
        profile.bio = _bio;
    }
}
