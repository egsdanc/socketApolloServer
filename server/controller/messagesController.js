 // messagesController.js
const Message = require('../model/Message')

const getMessages = () => {
  return Message.find();
};

const sendMessage = (sender, content, messageId, pubsub) => {
  const newMessage = new Message({ sender, content, messageId });
  return newMessage.save()
    .then((savedMessage) => {
      pubsub.publish('MESSAGE_RECEIVED', { messageReceived: savedMessage });
      return savedMessage;
    })
    .catch((error) => {
      console.error('Error saving message to MongoDB: ', error);
      throw error;
    });
};

module.exports = {
  getMessages,
  sendMessage,
};
