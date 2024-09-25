import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const otherUserProfile = asyncHandler(async (req, res) => {
    const otherUserId = req.params.id
    console.log(otherUserId)
    if (otherUserId == req.user._id) {
        throw new ApiError(400, "You are trying to view your profile ")
    }
    const oUser = await User.findById(otherUserId)


    if (oUser.access ==="0") {
        if (!oUser.followers.includes(req.user._id)) {
            return res.status(201).json(
                new ApiResponse(200,{username:oUser.username,fullname:oUser.fullName,Avtar:oUser.avtar}, "User profile is private !!!")
            )
        }
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: oUser
                },
                "User profile shared Successfully"
            )
        )



})

const myProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const me = await User.findById(userId)

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: me
                },
                "your profile view Successfully"
            )
        )

})


export { otherUserProfile, myProfile };