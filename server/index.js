const { ApolloServer, gql } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { PubSub } = require('graphql-subscriptions');
 
const db = require('./dataBase/db.js');
db.connectToDatabase();

 
 
const messagesTypeDefs = require("./graphql/typeDefs/messagesTypeDefs.js")
const articleTypeDefs = require('./graphql/typeDefs/articleTypeDefs.js') 
const userTypeDefs = require('./graphql/typeDefs/userTypeDefs.js')
const messageResolvers = require("./graphql/resolvers/messagesResolvers.js")
const articleResolvers = require('./graphql/resolvers/articleResolvers.js')
const userResolvers = require('./graphql/resolvers/userResolvers.js')


const pubsub = new PubSub();


const schema = makeExecutableSchema({
  typeDefs: [   messagesTypeDefs,userTypeDefs,articleTypeDefs],
  resolvers: [  messageResolvers,userResolvers,articleResolvers],
});

const app = express();
const httpServer = createServer(app);


const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
  context: ({ req, connection }) => {
    if (connection) {
      return connection.context;
    }
    return { pubsub };
  },
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer().then(() => {
  const PORT = process.env.PORT || 5000;

  httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams, webSocket, context) => {
        return { pubsub };
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );
});
