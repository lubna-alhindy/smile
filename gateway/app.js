const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
require("dotenv").config();

const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');

/// -------------------------------------------- ///

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  const app = express();

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.listen(process.env.PORT ,result => {
    console.log(`🚀 Gateway Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  });
}

/// -------------------------------------------- ///

startServer()
  .then()
  .catch(err => {
    console.error(err);
  });

/// -------------------------------------------- ///