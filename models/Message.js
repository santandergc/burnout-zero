const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    timestamp: Date
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
