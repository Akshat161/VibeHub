import {Post} from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"


const createStory = asyncHandler(async (req, res) => {

    const {content} = req.body
    // console.log(req.body)

    
    const userName = req.user.username;

    //console.log(req)

    const imageLocalPath = req.files?.image[0].path;
  
     
    if (!imageLocalPath) {
        throw new ApiError(400, "img is required")
    }

    const image = await uploadOnCloudinary(imageLocalPath)
   

    if (!image) {
        throw new ApiError(400, "image is required")
    }
    // const createdUs = await Post.findById(user._id)
    const post = await Post.create({
        username: userName, 
        image: image.url,
        content,
    })

    const createdPost = await Post.findById(post._id)
    if (!createdPost) {
        throw new ApiError(500, "something went wrong while posting")
    }

    return res.status(201).json(
        new ApiResponse(200, createdPost, "User posted Successfully!!!")
    )
})

export{createStory}