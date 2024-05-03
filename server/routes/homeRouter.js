import express from 'express';
import { testing } from '../controllers/homeRouterController.js';

const router = express.Router();

router.route("/").get(testing);

export default router;