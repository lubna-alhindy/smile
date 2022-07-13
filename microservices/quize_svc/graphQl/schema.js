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
  
  typy quizRequests{
    id: Int!
    subjectName: String!
    question: String!
    answer: String!
    createdAt: Date
    updatedAt: Date
  }
  
  type Query {
   
  }


  type Mutation {
   
  }
`;


module.exports = typeDefs;