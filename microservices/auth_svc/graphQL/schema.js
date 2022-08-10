const { gql } = require('apollo-server-express');

/// ----------------------------- ///

const typeDefs = gql`

 enum Roles {
    Student
    Admin_
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