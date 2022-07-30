const { gql } = require('apollo-server');

/// ----------------------------- ///

const typeDefs = gql`

 enum Roles {
    Student
    Admin
    General_Supervisor
    Private_Supervisor
	}
	
  ############
  
  type Query {
  	authorize(roleName: Roles! ,permissionName: String!)
  		: Boolean
  }
`;

/// ----------------------------- ///

module.exports = typeDefs;