const { gql } = require('apollo-server-express');

/// ------------------------------------------------------------------------------------ ///

const typeDefs = gql`  
  scalar Date
  scalar Void
  scalar Upload
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  # ------------------------------------- QUIZ-SVC ------------------------------------- # 
  
    type quizs {
      id: Int!
      subjectName: String!
      question: String!
      answer: String!
      createdAt: Date
      updatedAt: Date
      subject: subjects
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
  
  # ------------------------------------- AUTH-SVC ------------------------------------- #
  
    enum Roles {
      Student
      Admin
      Public_Supervisor
      Private_Supervisor
    }
  
  # ------------------------------------- POST-SVC ------------------------------------- #
  
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
    
    enum PostTypes {
      Advertisement
      Inquiry
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
      subject: subjects
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
      subject: subjects
    }
    
    type PostImage {
      id: Int!
      name: String!
      postId: Int
      postRequestId: Int
      base64image: String
      adId: Int
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
    
  # ------------------------------------- USER-SVC ------------------------------------- #
  
    type AuthPayload {
      token: String!
    }
  
    type Users {
        id: Int!
        email: String!
        password: String!
        roleName: String!
        bio: String
        gmail: String
        image: String
        class: Class
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
    
    type UsersUniversityNumbers {
      id: Int!
      userId: Int!
      year: String!
      createdAt: Date
      updatedAt: Date
      universityNumber: Int!
      user: Users!
    }

  # ------------------------------------- QUERY ------------------------------------- #
  
    type Query {
    
      # --------------------------------- QUIZ-SVC --------------------------------- #

        getQuizs(subjectName: String)
          : [quizs]!
          
        getQuizRequests
          : [quizs]!  
        
      # --------------------------------- USER-SVC --------------------------------- #
      
        getUser(id: Int!)
          : Users
    
        getAllUser
          : [Users!]!
        
        getBanState(id: Int!)
    	    : Boolean
         
        getBansUser
          : [Bans]!
        
        getAllComplaints
          : [Complaints]!
         
      # --------------------------------- POST-SVC --------------------------------- #
  
        getAllAds
          : [Ads]!
    
        getAllPostRequests
          : [PostRequests]!
    
        getPost(id: Int! ,like: Boolean ,comment: Boolean)
          : Posts
    
        getPosts(type: PostTypes ,subjectId: [Int])
          : [Posts]
        
        getAllPostOfSubject(subjectId: [Int]!)
          : [Posts]! 
    }

  # ------------------------------------- MUTATION ------------------------------------- #

    type Mutation {
      singleUpload(file: Upload!)
         : File!
      
      # --------------------------------- QUIZ-SVC --------------------------------- #

        addQuiz(subjectName: String! ,question: String! ,answer: String!)
          : quizs
        
        deleteQuiz(id: Int!)
          : Void
        
        approvalQuizRequest(id: Int! ,choice: Boolean!)
          : Void
      
      # --------------------------------- USER-SVC --------------------------------- #
      
        signup(firstName: String!, lastName: String!, email: String!, password: String!)
        : AuthPayload!
    
        login(email: String!, password: String!)
          : AuthPayload!
    
        editProfile(
            id: Int!, firstName: String, lastName: String,
            birthday: Date, image: String, bio: String, facebookURL: String,
            telegramURL: String, class: Class, gmail: String
        ) : Users 
        
        userChangePassword(id: Int! ,oldPassword: String! ,newPassword1: String! ,newPassword2: String!)
          : Users
          
        changeUserRole(id: Int! ,roleName: Roles)
          : Users
        
        userDeleteAccount(email: String!, password: String)
          : Void 
       
        changeBanUser(userId: Int!)
          : Users
    
        addComplaint(userId: Int! ,title: String ,body: String!)
          : Complaints
    
        changeDoneComplaint(id: Int!)
          : Complaints
    
        deleteComplaint(id: Int!)
          : Void
    
        addUsersUniversityNumber(userId: Int!,universityNumber: Int! ,year: String!)
          : UsersUniversityNumbers
    
        deleteUsersUniversityNumber(id: Int!)
          : Void
      
      # --------------------------------- POST-SVC --------------------------------- #
      
        addAd(title: String! ,body: String! ,expireIn: Date! ,images: [String]!)
          : Ads
          
        updateAd(id: Int! ,title: String ,body: String ,expireIn: Date ,images: [String])
          : Ads
    
        deleteAd(id: Int!)
          : Void
        
        subervisorAddPost(subjectId: Int ,type: PostTypes! ,title: String! ,body: String! ,userId: Int! ,images: [String]!)
          : Posts
          
        addPost(subjectId: Int ,type: PostTypes! ,title: String! ,body: String! ,userId: Int! ,images: [String]!)
          : Posts
    
        deletePost(id: Int!)
          : Void
    
        approvalPostRequest(id: Int! ,choice: Boolean!)
          : Void
    
        changeLike(userId: Int! ,postId: Int!)
          : Posts
    
        addComment(body: String! ,userId: Int! ,postId: Int!)
          : Comments
    
        deleteComment(id: Int!)
          : Void
    
        changeFavorite(userId: Int! ,postId: Int!)
          : Posts
    }
`;

/// ------------------------------------------------------------------------------------ ///

module.exports = typeDefs;