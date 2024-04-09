const Chat = require('../models/Chat');
const User = require('../models/User');
const Message = require('../models/Message');
const { sendNewMessage } = require('./message.controller');

const getChatsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const category = req.params.category;
        const userChats = await User.findOne({ _id: userId }).populate('chats.chatId');
        console.log(category);

        let filteredChats;
        if (category === 'favorite') {
            console.log('test');
            filteredChats = userChats.chats.filter(c => c.status.favorite);
        } else {
            filteredChats = userChats.chats.filter(c => c.status.type === category);
        }
        console.log(filteredChats);
        res.status(200).json(filteredChats);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}


const getChatById = async (req, res) => {
    try {
        const chatId = req.params.userId;
        const chat = await Chat.findById(chatId).populate('members messages');
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })

    }
};


const addChatToMembers = async (chatId, members) => {
    const users = await User.find({ _id: { $in: members } });

    if (!users || users.length === 0) {
        throw new Error('No users found with the provided IDs');
    }

    const updatePromises = users.map(async (user) => {
        user.chats.push({
            chatId: chatId,
            status: {
                type: 'inbox',
                read: false,
                favorite: false
            }
        });

        await user.save();
    });

    await Promise.all(updatePromises);


}


const createChat = async (req, res) => {
    const { subject, members, initialMessage } = req.body;
    try {
        console.log(subject, members, initialMessage);
        // const intialMessageId = await sendNewMessage(initialMessage.sender, initialMessage.content);

        //create the initial message
        const date = new Date().toISOString();
        const newMessage = new Message({ date, sender: initialMessage.sender, content: initialMessage.content });
        await newMessage.save();

        //chat creating
        const initialMessageId = newMessage.id;
        const newChat = await new Chat({ subject, members: [initialMessage.sender, ...members], messages: [initialMessageId] });
        await newChat.save();

        //send the chat to members
        console.log('chat id:',);
        addChatToMembers(newChat.id, members);
        // const users = await User.find({ _id: { $in: members } });

        // if (!users || users.length === 0) {
        //     throw new Error('No users found with the provided IDs');
        // }

        // const updatePromises = users.map(async (user) => {
        //     // Add the new chat ID to the user's chats array with default status values
        //     user.chats.push({
        //         chatId: newChat.id,
        //         status: {
        //             type: 'inbox',
        //             read: false,
        //             favorite: false
        //         }
        //     });

        //     await user.save(); // Save the updated user
        // });

        // await Promise.all(updatePromises);


        res.status(201).json(newChat);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// const createChat = async (subject, sender, intialMessage) => {
//     try {
//         const newChat = await new Chat({ subject, members: [sender], messages: [intialMessage] })
//         await newChat.save();
//         return newChat;
//     } catch (error) {
//         console.error('Error creating chat:', error);
//         throw error;
//     }
// }

const updateStatusByIds = async (userId, chatId, statusKey, statusValue) => {
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        const chatToUpdate = user.chats.find(chat => chat.chatId.equals(chatId));
        if (!chatToUpdate) {
            throw new Error('Chat not found');
        }
        chatToUpdate.status[statusKey] = statusValue;
        const updatedUser = await user.save();
        return updatedUser;
    } catch (error) {
        console.error('Error updating chat status:', error);
        throw error;
    }
};

module.exports = { getChatsByUserId, createChat, updateStatusByIds, getChatById }