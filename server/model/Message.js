// messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  content: String,
  messageId: String,
});

module.exports = mongoose.model('Message', messageSchema);
