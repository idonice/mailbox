//Message model

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;