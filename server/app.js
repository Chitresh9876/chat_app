import express from "express";
import cors from 'cors';
import { config } from "dotenv";
import homeRouters from "./routes/homeRouter.js";
import chatRouter from "./routes/chatRouter.js";
import userRoutes from "./routes/userRoutes.js";


config({ path: "./config/config.env" });

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRouters);
// app.use("/api/chat", chatRouter);
app.use('/api/user', userRoutes);

