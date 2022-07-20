const { gql } = require('apollo-server-express');

const typeDefs = gql`
  ##############################
  
  scalar Date
  scalar Void
  scalar Upload
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  ########## QUIZ-SVC ##########
  
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
  
  ########## AUTH-SVC ##########
  
	enum Roles {
		USER
		ADMIN
		PUBLIC_SUPERVISOR
		PRIVATE_SUPERVISOR
	}
	
	##############################

  type Query {
    getQuizRequests
      : [quizRequests]!
        
    getQuizs(subjectName: String)
      : [quizs]!
  }

	##############################

  type Mutation {
    singleUpload(file: Upload!): File!
    
    addQuiz(subjectName: String! ,question: String! ,answer: String!)
      : quizs
    
    deleteQuiz(id: Int!)
      : Void
    
    approvalQuizRequest(id: Int! ,choice: Boolean!)
      : Void
  }
  
	##############################
`;

module.exports = typeDefs;