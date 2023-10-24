const Message = require('../models/Message');

async function saveMessage(sender, receiver, text) {
    const newMessage = new Message({
        sender,
        receiver,
        message: text,
        timestamp: new Date()
    });
    
    try {
        await newMessage.save();
        console.log('Message saved successfully!');
    } catch (mongoErr) {
        console.error('Error saving message to MongoDB:', mongoErr);
    }
}

module.exports = {
    saveMessage
};
