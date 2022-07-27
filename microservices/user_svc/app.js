const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
require("dotenv").config();

const Controller = require('./controllers/Controller');
const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const models = require('./database/models');
require('dotenv').config();

/// -------------------------------------------- ///

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,

        context: async ({req}) => {
            console.log("HEADERS:");
            console.log(req.headers);
            console.log("BODY:");
            console.log(req.body);
            console.log("==========================================");

            return  {
                models: models
            };
        }
    });

    await server.start();
    const app = express();

    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });

    app.listen(process.env.PORT ,result => {
        console.log(`🚀 User service is ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    });
}

/// -------------------------------------------- ///

startServer()
  .then()
  .catch(err => {
      console.error(err);
  });

// --------------------------------------- //