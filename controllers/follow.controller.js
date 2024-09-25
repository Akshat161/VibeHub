import { User } from "../models/user.model.js"

const sendFollowRequest = async (req, res) => {
    try {
        const  targetUserId  = req.params.id; // The user to be followed
        const loggedInUserId = req.user.id; // The authenticated user who is sending the follow request

        if (targetUserId === loggedInUserId) {
            return res.status(400).json({ message: "You cannot follow yourself." });
        }

        // Find both the target user and the logged-in user
        const targetUser = await User.findById(targetUserId);
        const loggedInUser = await User.findById(loggedInUserId);

        if (!targetUser) {
            return res.status(404).json({ message: "User not found." });
        }
      
if(targetUser.access==="0"){

        // Check if follow request has already been sent
        if (targetUser.pendingFollowRequests.includes(loggedInUserId)) {
            return res.status(400).json({ message: "Follow request already sent." });
        }

        // Check if the user is already following
        if (loggedInUser.following.includes(targetUserId)) {
            return res.status(400).json({ message: "You are already following this user." });
        }

        // Add the follow request to the target user's pending requests
        targetUser.pendingFollowRequests.push(loggedInUserId);
        await targetUser.save();

        return res.status(200).json({
            message: `Follow request sent to ${targetUser.username}.`
        });
    }
    else{

        if (loggedInUser.following.includes(targetUserId)) {
            return res.status(400).json({ message: "You are already following this user." });
        }
        
        targetUser.followers.push(loggedInUser);
        loggedInUser.following.push(targetUser);

        // Save both users
        await loggedInUser.save();
        await targetUser.save();
        return res.status(200).json({
            message: `Followed to ${targetUser.username}.`
        });
    }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while sending the follow request." });
    }
};


export {sendFollowRequest}
