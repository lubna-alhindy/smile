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
	
  ########## USER-SVC ##########
    enum PostTypes {
		Announcement
		Inquiry
	}
	
    type Users {
        id: Int!
        email: String!
        password: String!
        roleName: String!
    
        bio: String
        gmail: String
        image: String
        class: String
        birthday: Date
        createdAt: Date
        updatedAt: Date
        lastName: String!
        firstName: String!
        facebookURL: String
        telegramURL: String
        isBaned: Boolean
    
        posts: [Posts]
        favorites: [Favorites]
        userUniversityNumbers: [UsersUniversityNumbers]
    }
      	
    type PostImage {
  	id: Int!
  	name: String!
  	postId: Int
  	postRequestId: Int
  	base64image: String
  	adId: Int
  }
  
  type Posts {
    id: Int!
    userId: Int!
    type: PostTypes!
    body: String!
    title: String
    subjectId: Int
    createdAt: Date!
    updatedAt: Date!
    postImages: [PostImage]!
    isLiked: Boolean
    isFavorite: Boolean
    user: Users!
    likesCnt: Int
    likes: [Likes]
    commentsCnt: Int
    comments: [Comments]
  }
  
  type PostRequests {
    id: Int!
    userId: Int!
    type: PostTypes!
    body: String!
    title: String
    subjectId: Int
    createdAt: Date!
    updatedAt: Date!
    postImages: [PostImage]!

    user: Users!
  }
  
  type Likes {
    id: Int!
    userId: Int!
    postId: Int!
    user: Users!
    createdAt: Date
    updatedAt: Date
  }
  
  type Comments {
    id: Int!
    body: String!
    userId: Int!
    postId: Int!
    user: Users!
    createdAt: Date
    updatedAt: Date
  }
  
  type Favorites {
    id: Int!
    userId: Int!
    postId: Int!
    post: Posts!
    createdAt: Date
    updatedAt: Date
  }
  
  type Bans {
    id: Int!
    userId: Int!
    user: Users
    createdAt: Date
    updatedAt: Date
  }
  
  type Complaints {
    id: Int!
    body: String!
    title: String
    isDone: Boolean
    createdAt: Date
    updatedAt: Date
    user: Users
  }
  
  type Ads {
    id: Int!
    body: String!
    title: String!
    expireIn: Date!
    createdAt: Date
    updatedAt: Date
    postImages: [PostImage]!
  }
  
  type UsersUniversityNumbers {
    id: Int!
    userId: Int!
    year: String!
    createdAt: Date
    updatedAt: Date
    universityNumber: Int!

    user: Users!
  }
   ##############################

  type Query {
    getQuizRequests
      : [quizRequests]!
        
    getQuizs(subjectName: String)
      : [quizs]!
      
    getUser(id: Int!)
      : Users
      
    getAllAds
      : [Ads]!
        
  }

	##############################

  type Mutation {
    singleUpload(file: Upload!)
       : File!
    
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