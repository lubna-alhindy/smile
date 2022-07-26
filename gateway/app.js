const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
require("dotenv").config();

const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const body = require('./graphQL/body');

/// -------------------------------------------- ///

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: async ({req}) => {
      return {
        token: !req.get('Authorization') ? null : (!req.get('Authorization').split(' ')[1] ? null : req.get('Authorization').split(' ')[1]),
        query: await body.getBody(req.body.query)
      };
    },

    introspection: true,
    playground: true
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