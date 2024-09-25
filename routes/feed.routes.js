import { Router } from "express";
import {getAllPosts} from "../controllers/feed.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router()

router.route('/getPosts').get(verifyJWT,getAllPosts);



export default router 














