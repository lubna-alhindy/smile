const { gql } = require('apollo-server');

/// ----------------------------- ///

const typeDefs = gql`

  enum Roles {
		طالب
		مدير
		مشرف_عام
		مشرف_خاص
	}
	
  ############
  
  type Query {
  	authorize(roleName: Roles! ,permissionName: String!)
  		: Boolean
  }
`;

/// ----------------------------- ///

module.exports = typeDefs;