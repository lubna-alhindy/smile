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
    UserId: Int!
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
    UserId: Int!
    createdAt: Date!
    updatedAt: Date!
    user: Users!
  }
  
  type Likes {
    id: Int!
    UserId: Int!
    PostId: Int!
    user: Users!
  }
  
  type Comments {
    id: Int!
    body: String!
    UserId: Int!
    PostId: Int!
    user: Users!
  }
  
  type Favorites {
    id: Int!
    UserId: Int!
    PostId: Int!
    post: Posts!
  }
  
  type Bans {
    id: Int!
    UserId: Int!
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
    UserId: Int!
    universityNumber: Int!
    year: String!
    user: Users!
  }
  
  type Query {
    getUser(id: Int!): Users
    getAllUser: [Users!]!
    getAllPosts: [Posts]!
    getAllAds:[Ads]!
    
    getAllGeneralPost: [Posts]!
    getAllPostOfUser(UserId: Int!): [Posts]!
    getAllPostOfSubject(subjectId: [Int]!): [Posts]!
    
    getBansUser: [Bans]!
    getAllComplaints: [Complaints]!
    getAllPostRequests: [PostRequests]!
  }
  
  type Mutation {
    createUser(roleName: String! ,firstName: String! ,lastName: String! ,email: String! ,password: String!): Users
    addPost(subjectId: Int ,type: String! ,title: String ,body: String! ,UserId: Int!): Posts
    like(UserId: Int! ,PostId: Int!): Void
    addAd(title: String! ,body: String! ,expireIn: Date!): Ads
    addComment(body: String! ,UserId: Int! ,PostId: Int!): Comments
    deleteComment(id: Int!):Void
    addFavorite(UserId: Int! ,PostId: Int!): Favorites
    deleteFavorite(id: Int!): Void
    banUser(UserId: Int!): Bans
    unBanUser(UserId: Int!): Void
    addComplaint(UserId: Int! ,title: String ,body: String!): Complaints
    deleteComplaint(id: Int!): Void
    makeComplaintAsDone(id: Int!): Complaints
    addUsersUniversityNumbers(UserId: Int!,universityNumber: Int! ,year: String!): UsersUniversityNumbers
    deleteUsersUniversityNumbers(id: Int!): Void
    acceptPostRequest(id: Int!): PostRequests
    deletePostRequest(id: Int!): Void
  }
`;

//add image to post and ads
module.exports = typeDefs;