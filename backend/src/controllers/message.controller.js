import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password");
        
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in message.controller.js - getAllContacts: ", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user_id;
        const {id:userToChatID} = req.params;
        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId: userToChatID},
                {senderId:userToChatID, receiverId: myId},
            ]
        });
        
        res.status(200).json(messages);

    } catch(error) {
        console.error("Error in message.controller.js - getMessagesByUserId: ", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user_id;

        if(!text && !image) {
            return res.status(400).json({message: "Text or image is required."});
        }

        if(senderId.equals(receiverId)) {
            return res.status(400).json({message: "Cannot send messages to yourself"});
        }

        const receiverExists = await User.exists({_id: receiverId});
        if(!receiverExists) {
            return res.status(404).json({message: "Message receiver not found."});
        }

        let imageUrl;
        if(image) {
            //Upload Base64 image to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        res.status(201).json(newMessage);

        //TODO: Send message in real time to other user if user is online using websockets

    } catch(error) {
        console.error("Error in message.controller.js - sendMessage: ", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        //Find all the messages where the logged in user is either the sender or reciver
        const messages = await Message.find({
            $or: [{senderId:loggedInUserId, receiverId: loggedInUserId}],
        });
        const chatPartnerIds = [...new Set(messages.map(msg => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId : msg.senderId))];
        const chatPartners = await User.find({_id: {$in:chatPartnerIds}}).select("-[password");
        res.status(200).json(chatPartners);
    } catch(error) {
        console.error("Error in message.controller.js - getChatPartners: ", error);
        res.status(500).json({message: "Internal Server Error"});     
    }
}