// ------- 3rd Party Pkg imports --------- //
const { ApolloServer } = require('apollo-server');

// ------------ My imports --------------- //
const Controller = require('./controllers/Controller');
const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const models = require('./database/models');
require('dotenv').config();

// --------------------------------------- //

const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: async ({req}) => {
        return {
            models: await models,
            payload: await Controller.Auth.getPayload(req.get('Authorization'))
        };
    },

    introspection: true,
    playground: true
});

server
    .listen({
        protocol: process.env.PROTOCOL,
        hostname: process.env.HOSTNAME,
        port: process.env.PORT,
    })
    .then(({url}) => {
        console.log("User service is running on " + url);
    });
