const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();

const Controller = require('./controllers/Controller');
const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const models = require('./database/models');

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
                payload: !req.get('token') ? null : jwt.decode(req.get('token') ,process.env.JWT_SECRET),
                models: models
            };
        }
    });

    await server.start();
    const app = express();

    server.applyMiddleware({
        app,
        cors: {
            origin: true,
            credentials: true,
        },
        bodyParserConfig: {
            limit:"50mb"
        }
    });

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

/// -------------------------------------------- ///