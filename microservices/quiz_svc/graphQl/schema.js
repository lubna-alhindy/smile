const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  scalar Void
  
  type quizs {
    id: Int!
    subjectName: String!
    question: String!
    answer: String!
    createdAt: Date
    updatedAt: Date
  }
  
  type quizRequests {
    id: Int!
    subjectName: String!
    question: String!
    answer: String!
    createdAt: Date
    updatedAt: Date
  }
  
  type Query {
    getQuizRequests
      : [quizRequests]!
        
    getQuizs(subjectName: String)
      : [quizs]!
  }

  type Mutation {
    addQuiz(subjectName: String! ,question: String! ,answer: String!)
      : quizs
    
    deleteQuiz(id: Int!)
      : Void
    
    approvalQuizRequest(id: Int! ,choice: Boolean!)
      : Void
  }
`;


module.exports = typeDefs;