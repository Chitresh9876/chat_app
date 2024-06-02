import express from "express";
import { registerRouter, authUser, allUsers } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


router.route("/").post(registerRouter).get(protect, allUsers);
router.route("/login").post(authUser);


export default router;