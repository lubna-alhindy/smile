const { gql } = require('apollo-server');

/// ----------------------------- ///

const typeDefs = gql`
  scalar Date
  scalar Void
  
  enum Section {
    Joint
    Software_Engineering  
    Artificial_Intelligence
    Computer_System_And_Networks
  }
  
  enum Semester {
    First
    Second
  }
  
  enum Class {
    First
    Second
    Third
    Fourth
    Fifth
  }
  
  enum SubjectTypes {
		Practical
		Theoretical
	}
	
  type subjects {
    id: Int!
    name: String!
    class: Class!
    semester: Semester!
    section: Section!
    type: SubjectTypes!
    createdAt: Date
    updatedAt: Date
  }
  
  type summarys {
    id: Int!
    subjectId: Int!
    title: String!
    body: String!
    subject: subjects
  }
  
  type Query {
    getSummary(id: Int!)
      : summarys
      
    getAllSummary(group: Class ,semester: Semester ,type: SubjectTypes)
      : [summarys]!

  }
  
  type Mutation {
   addSummary(subjectId: Int! ,title: String! ,body: String!)
    : summarys
    
   deleteSummary(id: Int!)
    : Void

  }
`;

/// ----------------------------- ///

module.exports = typeDefs;