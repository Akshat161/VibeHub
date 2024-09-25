import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {createPost,  deletePost, addComment, deleteComment, getPostsByUser, likeOrDislike} from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router()




// Create a new post
router.route("/createpost").post(upload.fields(
    [
        {
            name: "image",
            maxCount: 1
        }
    ]
),verifyJWT,createPost);


//like or dislike a post
router.post('/:id/likeordislike', verifyJWT, likeOrDislike);


// Add a comment to a post 

router.route('/:id/comments').post(verifyJWT,addComment);





// Delete a post 

router.route('/deletepost/:id').delete(verifyJWT,deletePost); //post's id



// Delete a comment

router.route('/:id/comments/:commentId').delete(verifyJWT,deleteComment); // id= post id  and comentId= comment id

// Get all posts by a specific user

router.route('/user/:userId').get(getPostsByUser);

export default router 














