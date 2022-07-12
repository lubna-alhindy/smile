const { gql } = require('apollo-server');

/// ----------------------------- ///

const typeDefs = gql`
	enum Roles {
		USER
		ADMIN
		PUBLIC_SUPERVISOR
		PRIVATE_SUPERVISOR
	}
	
  ############
  
  type Query {
  	authorize(roleName: Roles! ,permissionName: String!)
  		: Boolean
  }
`;

/// ----------------------------- ///

module.exports = typeDefs;