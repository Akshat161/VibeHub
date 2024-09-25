import { Router } from "express";
import { otherUserProfile, myProfile } from "../controllers/profile.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()


router.route('/other/:username').post(verifyJWT, otherUserProfile);
router.route('/my').post(verifyJWT, myProfile);

export default router 