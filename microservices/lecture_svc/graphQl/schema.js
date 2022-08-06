const {gql} = require('apollo-server');

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
	 
	enum LectureTypes {
	  RBCs
	  Other
	  Binary
	  Slides
	  References
	  StudentWrite
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
    createdAt: Date
    updatedAt: Date
  }
  
  type weeklyschedules {
    id: Int!
    url: String!
    year: String!
    createdAt: Date
    updatedAt: Date
  }
  
  type lectures{
    subjectId: Int!
    url: String!
    year: String!
    type: LectureTypes!
    subject: subjects
    createdAt: Date
    updatedAt: Date
  }
  
  type Query {
    getSummary(id: Int!)
      : summarys
      
    getAllSummary(class: Class ,semester: Semester ,type: SubjectTypes)
      : [summarys]!
    
    getLecture(id: Int!)
      : lectures
      
    getAllLecture(class: Class ,semester: Semester ,type: SubjectTypes ,lectureType: LectureTypes ,year: String)
      : [lectures]!
    
    getWeeklySchedule(year: String!)
      : weeklyschedules
  }
  
  type Mutation {
    addSummary(subjectId: Int! ,title: String! ,body: String!)
       : summarys
      
    deleteSummary(id: Int!)
       : Void

    addLecture(url: String ,year: String ,subjectId: Int ,type: LectureTypes!)
       : Void
       
    deleteLecture(id: Int!)
       : Void
       
    deleteWeeklySchedule(id: Int!)
       : Void
       
    addWeeklySchedule(url: String! ,year: String!)
       : Void
  }
`;

/// ----------------------------- ///

module.exports = typeDefs;