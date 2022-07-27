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

// --------------------------------------- //

server
	.listen({
		protocol: process.env.PROTOCOL,
		hostname: process.env.HOSTNAME,
		port: process.env.PORT,
	})
	.then(({url}) => {
		console.log("🚀 Auth service is running on " + url);
	});

// --------------------------------------- //