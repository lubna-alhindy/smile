const { gql } = require('apollo-server-express');

/// ----------------------------- ///

const typeDefs = gql`

 enum Roles {
      Student_
      Admin_
      Public_Supervisor
      First_Supervisor
      Second_Supervisor
      Third_Supervisor
      Fourth_Supervisor
      Fifth_Supervisor
	}
	
  ############
  
  type Query {
  	authorize(roleName: Roles! ,permissionName: String!)
  		: Boolean
  }
`;

/// ----------------------------- ///

module.exports = typeDefs;