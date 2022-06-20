// ------- 3rd Party Pkg imports --------- //
const { ApolloServer } = require('apollo-server');

// ------------ My imports --------------- //
const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const dev = require('./config/dev');
const models = require('./models');

// --------------------------------------- //

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models }
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

