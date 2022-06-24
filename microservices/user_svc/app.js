// ------- 3rd Party Pkg imports --------- //
const { ApolloServer } = require('apollo-server');

// ------------ My imports --------------- //
const Controller = require('./controllers/Controller');
const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const dev = require('./config/dev');
const models = require('./models');

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
        protocol: dev.apolloServerOptions.protocol,
        hostname: dev.apolloServerOptions.hostname,
        port: dev.apolloServerOptions.port,
    })
    .then(({url}) => {
        console.log("User service is running on " + url);
    });

