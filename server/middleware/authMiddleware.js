import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // decode token
            const decoded = jwt.verify(token, process.env.JWTSECRET);

            req.user = await User.findById(decoded._id).select("-password");
            next();
        }
        catch (err) {
            res.status(401);
            throw new Error("Not authorised, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorised, no token");
    }
});