// messageResolvers.js
 const messagesController = require('../../controller/messagesController.js'); // messagesController'ı içe aktarın

 
const resolvers = {
  Query: {
    dummy: () => 'Hello, World!',
    messages: () => {
      return messagesController.getMessages(); // messagesController'ı kullanın
    },
  },
  Mutation: {
    sendMessage: (_, { sender, content, messageId }, context) => {
      const { pubsub } = context;
      return messagesController.sendMessage(sender, content, messageId, pubsub); // messagesController'ı kullanın
    },
  },
  Subscription: {
    messageReceived: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['MESSAGE_RECEIVED']),
    },
  },
};

module.exports = resolvers;
