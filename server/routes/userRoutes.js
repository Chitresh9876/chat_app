import express from "express";
import { registerRouter, authUser } from "../controllers/userControllers.js";


const router = express.Router();


router.route("/register").post(registerRouter);
router.route("/login").post(authUser);


export default router;