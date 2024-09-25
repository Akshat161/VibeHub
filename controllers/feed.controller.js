
import { User } from "../models/user.model.js"
import { Post } from "../models/post.model.js";

const getAllPosts = async (req, res) => {
    try {
        const loggedInUserId = req.user.id; // Get the ID of the logged-in user
        const loggedInUser = await User.findById(loggedInUserId); // Fetch the logged-in user

        // Fetch posts created by the logged-in user
        const loggedInUserPosts = await Post.find({ username: req.user.username }).populate('username', 'username avatar');

        // Fetch posts from users that the logged-in user is following
        const followingUserPosts = await Promise.all(
            loggedInUser.following.map(async (followedUserId) => {
                return await Post.find({ username: followedUserId }).populate('username', 'username avatar');
            })
        );

        // Combine the logged-in user's posts with the followed users' posts
        const allPosts = [...loggedInUserPosts, ...followingUserPosts.flat()];

        // Optionally sort the posts by createdAt date, newest first
        allPosts.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json({
            posts: allPosts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching posts." });
    }
};

export{getAllPosts}