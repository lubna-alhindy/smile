const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  scalar Void
  

  type AuthPayload {
    token: String!
    user: Users!
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

    posts: [Posts]
    favorites: [Favorites]
    userUniversityNumbers: [UsersUniversityNumbers]
  }
  
  type PostImage {
  	id: Int!
  	url: String!
  	postId: Int
  	postRequestId: Int
  	adId: Int
  }
  
  type Posts {
    id: Int!
    userId: Int!
    type: String!
    body: String!
    title: String
    subjectId: Int
    createdAt: Date!
    updatedAt: Date!
    postImages: [PostImage]!

    user: Users!
    likesCnt: Int
    likes: [Likes]
    commentsCnt: Int
    comments: [Comments]
  }
  
  type PostRequests {
    id: Int!
    userId: Int!
    type: String!
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
  

  type Query {
    getUser(id: Int! ,favorite: Boolean ,universityNumber: Boolean ,posts: Boolean)
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

    getPosts(filter: String)
      : [Posts]
    
    getAllPostOfSubject(subjectId: [Int]!)
      : [Posts]! 
  }
  

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!)
      : AuthPayload!

    login(email: String!, password: String!)
      : AuthPayload!

    editProfile(
        id: Int!, firstName: String, lastName: String,
        birthday: Date, image: String, bio: String, facebookURL: String,
        telegramURL: String, class: String, gmail: String, oldPassword: String,
        firstNewPassword: String, secondNewPassword: String
    ) : Users 
    
    userDeleteAccount(email: String!, password: String)
      : Void 
     
    addPost(subjectId: Int ,type: String! ,title: String ,body: String! ,userId: Int!)
      : Posts

    deletePost(id: Int!)
      : Void

    approvalPostRequest(id: Int! ,cheack: Boolean!)
      : PostRequests

    changeLike(userId: Int! ,postId: Int!)
      : Void

    addComment(body: String! ,userId: Int! ,postId: Int!)
      : Comments

    deleteComment(id: Int!, userId: Int!)
      : Void

    changeFavorite(userId: Int! ,postId: Int! )
      : Favorites

    changeBanUser(userId: Int! ,choise: Boolean)
      : Bans

    addComplaint(userId: Int! ,title: String ,body: String!)
      : Complaints

    changeDoneComplaint(id: Int! ,choise: Boolean)
      : Complaints

    deleteComplaint(id: Int!)
      : Void

    addUsersUniversityNumbers(userId: Int!,universityNumber: Int! ,year: String!)
      : UsersUniversityNumbers

    deleteUsersUniversityNumbers(id: Int!)
      : Void

    addAd(title: String! ,body: String! ,expireIn: Date! ,images: [PostImage])
      : Ads

    deleteAd(id: Int!)
      : Void 
  }
`;

//cheack if ban and role befor any request
//add type notification

module.exports = typeDefs;