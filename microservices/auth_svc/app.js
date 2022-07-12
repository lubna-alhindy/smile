// ------- 3rd Party Pkg imports --------- //
const { ApolloServer } = require('apollo-server');

// ------------ My imports --------------- //
const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const models = require('./database/models');
require('dotenv').config();

// --------------------------------------- //

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: models,

	introspection: true,
	playground: true
});

// --------------------------------------- //

server
	.listen({
		protocol: process.env.PROTOCOL,
		hostname: process.env.HOSTNAME,
		port: process.env.PORT,
	})
	.then(({url}) => {
		console.log("Auth service is running on " + url);
	});

// --------------------------------------- //