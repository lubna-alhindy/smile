const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  scalar Void
  
	enum Roles {
		USER
		ADMIN
		PRIVATE_SUPERVISOR
		PUBLIC_SUPERVISOR
	}
	
	enum PostTypes {
		Announcement
		Inquiry
	}
	
	type Payload {
    id: Int!
    email: String!
    roleName: String!
	}

  type AuthPayload {
    token: String!
  }
  
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
    subject: subjects
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
  

  type Query {
    getUser(id: Int!)
      : Users

    getAllUser
      : [Users!]!

    getAllAds
      : [Ads]!

    getBansUser
      : [Bans]!

    getAllPostRequests
      : [PostRequests]!

    getPost(id: Int! ,like: Boolean ,comment: Boolean)
      : Posts

    getAllComplaints
      : [Complaints]!

    getPosts(type: PostTypes ,subjectId: [Int])
      : [Posts]
    
    getAllPostOfSubject(subjectId: [Int]!)
      : [Posts]! 
    
    getBanState(id: Int!)
    	: Boolean
    	
    checkToken(token: String!)
      : Payload
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!)
      : AuthPayload!

    login(email: String!, password: String!)
      : AuthPayload!

    editProfile(
        id: Int!, firstName: String, lastName: String,
        birthday: Date, image: String, bio: String, facebookURL: String,
        telegramURL: String, class: String, gmail: String
    ) : Users 
    
    userChangePassword(id: Int! ,oldPassword: String! ,newPassword1: String! ,newPassword2: String!)
    	: Users
    	
    changeUserRole(id: Int! ,roleName: Roles)
    	: Users
    
    userDeleteAccount(email: String!, password: String)
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

    addAd(title: String! ,body: String! ,expireIn: Date! ,images: [String]!)
      : Ads
      
    updateAd(id: Int! ,title: String ,body: String ,expireIn: Date ,images: [String])
      : Ads

    deleteAd(id: Int!)
      : Void 
  }
`;

//add type notification
//add schendual ads deleter

module.exports = typeDefs;