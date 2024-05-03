import express from 'express';
import { handleChatData, handleSingleChatData } from '../controllers/chatRouterController.js';


const router = express.Router();

router.route("/").get(handleChatData);
router.route("/:id").get(handleSingleChatData);

export default router;