const { gql } = require('apollo-server-express');

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
  
  type marksfiles{
    id: Int!
    subjectId: Int!
    url: String!
    year: String!
    subject: subjects
    createdAt: Date
    updatedAt: Date
  }
  
  
  type Query {
    getMarksFiles(id: Int!)
      : marksfiles
      
    getAllMarksFiles(class: Class ,semester: Semester ,type: SubjectTypes ,year: String)
      : [marksfiles]!
  }

  type Mutation {
    addMarksFile(url: String! ,year: String! ,subjectId: Int!)
      : marksfiles
       
    deleteMarksFile(id: Int!)
       : Void
  }
`;

module.exports = typeDefs;