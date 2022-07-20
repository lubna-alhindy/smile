const { gql } = require('apollo-server-express');

const typeDefs = gql`
  ##############################
  
  scalar Upload
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  ########## AUTH-SVC ##########
  
	enum Roles {
		USER
		ADMIN
		PUBLIC_SUPERVISOR
		PRIVATE_SUPERVISOR
	}
	
	##############################

  type Query {
    hello: String
  }

	##############################

  type Mutation {
    singleUpload(file: Upload!): File!
  }
  
	##############################
`;

module.exports = typeDefs;