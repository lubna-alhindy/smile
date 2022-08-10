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
  
  type subjects {
    id: Int!
    name: String!
    class: Class!
    semester: Semester!
    section: Section!
    type: String!
    createdAt: Date
    updatedAt: Date
  }
  
  type quizs {
    id: Int!
    subjectId: Int!
    question: String!
    answer: String!
    createdAt: Date
    updatedAt: Date
    subject: subjects
  }
  
  type quizRequests {
    id: Int!
    subjectId: Int!
    question: String!
    answer: String!
    createdAt: Date
    updatedAt: Date
    subject: subjects
  }
  
  type Query {
    getQuizRequests
      : [quizRequests]!
        
    getQuizs(subjectId: Int)
      : [quizs]!
      
    getQuiz(quizId: Int!)
       : quizs
  }

  type Mutation {
    addQuiz(subjectId: Int! ,question: String! ,answer: String!)
      : quizs
    
    deleteQuiz(id: Int!)
      : Void
    
    approvalQuizRequest(id: Int! ,choice: Boolean!)
      : Void
  }
`;


module.exports = typeDefs;