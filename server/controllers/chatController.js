import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

export const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("User Id param not send with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };


        try {
            const createChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createChat._id }).populate("users", "-password");

            res.status(200).send(FullChat);
        }
        catch (err) {
            res.status(400);
            throw new Error(err.message);
        }

    }
});


export const fetchChats = asyncHandler(async (req, res) => {
   Chat.find({ users: { $elemMatch : { $eq: req.user._id}}}) 
   .populate("users", "-password")
   .populate("groupAdmin", "-password")
   .populate("latestMessage")
    .sort({ updatedAt: -1 })
       .then(async (results) => {
           results = await User.populate(results, {
               path: "latestMessage.sender",
               select: "name pic email",
           });

           res.status(200).send(results);
       })
       .catch((err) => {
           res.status(400).send(err?.message);
    })
});


export const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body?.users || !req.body?.name) {
        res.status(400).json({
            success: false,
            message: "Fill all the details",
        });
    }
   
    var users = JSON.parse(req?.body?.users);

    if (users.length < 2) {
        res.status(401).json({
            success: false,
            message: "Add more than 2 users to create group",
        });
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req?.body?.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req?.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat?._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        
        res.status(200).json(fullGroupChat);
    }
    catch (err) {
        res.status(400);
        throw new Error(err?.message);
    }
});


export const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
    
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (!updatedChat) {
        res.status(400);
        throw new Error("Chat not found");
    }
    else {
        res.status(200).json(updatedChat);
    }
});


export const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    
    const addedUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!addedUser) {
      res.status(400);
      throw new Error("Chat not found");
    } else {
      res.status(200).json(addedUser);
    }
});


export const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    
    const deleteUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!deleteUser) {
      res.status(400);
      throw new Error("Chat not found");
    } else {
      res.status(200).json(addedUser);
    }
});
