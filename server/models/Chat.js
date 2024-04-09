//Chat model

const mongoose = require('mongoose');

const chatShcema = new mongoose.Schema({
    subject: {
        type: String,
        default: ''
    },
    members: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        required: true
    },
    messages: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
        ],
        required: true
    }
})

const Chat = mongoose.model('Chat', chatShcema);

module.exports = Chat;