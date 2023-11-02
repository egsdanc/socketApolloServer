 // messageTypeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    dummy: String
    messages: [Message]
  }
  type Mutation {
    sendMessage(sender: String!, content: String!, messageId: String!): Message
  }
  type Message {
    id: ID
    sender: String
    content: String
  }
  type Subscription {
    messageReceived: Message
  }
`;

module.exports = typeDefs;
