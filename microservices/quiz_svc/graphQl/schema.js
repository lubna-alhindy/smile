const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  scalar Void
  
  enum Section {
    COMMON
    SOFTWARE_ENGINEERING
    ARTIFICIAL_INTELLIGENCE
    COMPUTER_SYSTEMS_AND_NETWORKING
  }
  
  type subjects {
    id: Int!
    name: String!
    class: String!
    semester: String!
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