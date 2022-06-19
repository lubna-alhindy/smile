const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  scalar Void
  
  type Users {
    id: Int!
    roleName: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    birthday: Date
    image: String
    bio: String
    class: String
    facebookURL: String
    telegramURL: String
    gmail: String
    createdAt: Date
    updatedAt: Date
    posts: [Posts]!
    favorites: [Favorites]!
    userUniversityNumbers: [UsersUniversityNumbers]!
  }
  
  type Posts {
    id: Int!
    subjectId: Int
    type: String!
    title: String
    body: String!
    userId: Int!
    createdAt: Date!
    updatedAt: Date!
    likes: [Likes]!
    likesCnt: Int!
    user: Users!
    comments: [Comments]!
    commentsCnt: Int!
  }
  
  type PostRequests {
    id: Int!
    subjectId: Int
    type: String!
    title: String
    body: String!
    userId: Int!
    createdAt: Date!
    updatedAt: Date!
    user: Users!
  }
  
  type Likes {
    id: Int!
    userId: Int!
    postId: Int!
    user: Users!
  }
  
  type Comments {
    id: Int!
    body: String!
    userId: Int!
    postId: Int!
    user: Users!
  }
  
  type Favorites {
    id: Int!
    userId: Int!
    postId: Int!
    post: Posts!
  }
  
  type Bans {
    id: Int!
    userId: Int!
    user: Users
  }
  
  type Complaints{
    id: Int!
    title: String
    body: String!
    isDone: Boolean
    user: Users
  }
  
  type Ads{
    id: Int!
    title: String!
    body: String!
    expireIn: Date!
  }
  
  type UsersUniversityNumbers{
    id: Int!
    userId: Int!
    universityNumber: Int!
    year: String!
    user: Users!
  }
  
  type Query {
    getUser(id: Int!): Users
    getAllUser: [Users!]!
    getAllAds:[Ads]!
    getPost(id: Int!): [Posts]
    getAllGeneralPost: [Posts]!
    getAllPostOfUser(userId: Int!): [Posts]!
    getAllPostOfSubject(subjectId: [Int]!): [Posts]!
    
    getBansUser: [Bans]!
    getAllComplaints: [Complaints]!
    getAllPostRequests: [PostRequests]!
  }
  
  type Mutation {
    createUser(roleName: String! ,firstName: String! ,lastName: String! ,email: String! ,password: String!): Users
    addPost(subjectId: Int ,type: String! ,title: String ,body: String! ,userId: Int!): Posts
    like(userId: Int! ,postId: Int!): Void
    addAd(title: String! ,body: String! ,expireIn: Date!): Ads
    addComment(body: String! ,userId: Int! ,postId: Int!): Comments
    deleteComment(id: Int!):Void
    addFavorite(userId: Int! ,postId: Int!): Favorites
    deleteFavorite(id: Int!): Void
    banUser(userId: Int!): Bans
    unBanUser(userId: Int!): Void
    addComplaint(userId: Int! ,title: String ,body: String!): Complaints
    deleteComplaint(id: Int!): Void
    makeComplaintAsDone(id: Int!): Complaints
    
    addUsersUniversityNumbers(userId: Int!,universityNumber: Int! ,year: String!): UsersUniversityNumbers
    deleteUsersUniversityNumbers(id: Int!): Void
    
    approvalPostRequest(id: Int! ,cheack: Boolean!): PostRequests
  }
`;

//add image to post and ads
module.exports = typeDefs;