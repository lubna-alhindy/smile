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
  
  type universitynumbers{
    id: Int!
    universityNumber: Int!
    year: String!
  }
  
  type subjectsuniversitynumbers{
    id: Int!
    universityNumberId: Int!
    subjectId: Int!
    mark: Int!
    subject: subjects!
    universityNumber: universitynumbers
  }
  
  type Marks {
    avg: Float!
    marks: [subjectsuniversitynumbers]!
  }
  
  input universityNumbersInput {
    universityNumber: Int!
    year: String!
  }
  
  type Query {
    getMarksFiles(id: Int!)
      : marksfiles
      
    getAllMarksFiles(class: Class ,semester: Semester ,type: SubjectTypes ,year: String)
      : [marksfiles]!
      
    getUserMarks(class: Class! ,type: SubjectTypes ,universityNumberIds: [Int]!)
      : Marks
      
    getUniversityNumbers(years: [String]!, universityNumbers: [Int]!)
      : [Int]!
      
    getSpecialSubjects(class: Class! ,universityNumbers: [Int]!)
      : [Int]!
  }

  type Mutation {
    addMarksFile(url: String! ,year: String! ,subjectId: Int!)
      : marksfiles
       
    deleteMarksFile(id: Int!)
       : Void
       
    analyseMarksFile(id: Int!)
       : Void
  }
`;

module.exports = typeDefs;