import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../config/generateToken.js';


export const registerRouter = asyncHandler(async (req, res) => {
    const { email, name, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all Fields");
    }

    const userExits = await User.findOne({ email });

    if (userExits) {
        res.status(400).json({
            success: false,
            message: 'User already exits',
        });
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            }
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Failed to create the user',
        })
    }
});


export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user =  await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            }
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'User does not found',
        })
    }
})

// /api/user?search=chitresh
export const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    } : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    res.send(users);

});