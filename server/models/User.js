// user model

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    chats: {
        type: [
            {
                chatId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Chat'
                },
                status: {
                    type: {
                        type: String,
                        enum: ['inbox', 'sent', 'draft', 'removed'],
                        default: 'inbox',
                    },
                    read: {
                        type: Boolean,
                        default: false,
                    },
                    favorite: {
                        type: Boolean,
                        default: false,
                    }
                }
            }

        ],
        default: []
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
