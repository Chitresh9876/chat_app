import express from "express";
import { registerRouter } from "../controllers/userControllers.js";


const router = express.Router();


router.route("/").post(registerRouter);


export default router;