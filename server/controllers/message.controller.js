const Message = require('../models/Message');
const { createChat } = require('./chat.controller');

const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const sendMessageToChat = async (req, res) => {
    try {
        const { sender, content } = req.body;
        const date = new Date().toISOString();
        const newMessage = new Message({ date, sender, content });
        await newMessage.save();
        res.status(201).json({ message: 'message sent successfully', message: newMessage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const sendNewMessage = async (sender, content) => {
    try {
        const date = new Date().toISOString();
        const newMessage = new Message({ date, sender, content });
        await newMessage.save();
        return newMessage.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// const sendNewMessage = async (req, res) => {
//     try {
//         const { sender, members, content, subject } = req.body;
//         const date = new Date().toISOString();
//         const newMessage = new Message({ date, sender, content });
//         await newMessage.save();
//         const newChat = await createChat(subject, sender, newMessage);
//         res.status(201).json({ message: 'Message sent successfully and new chat created', newChat });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }
module.exports = { getMessageById, sendMessageToChat, sendNewMessage };