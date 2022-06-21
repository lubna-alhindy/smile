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
    posts: [Posts]
    favorites: [Favorites]
    userUniversityNumbers: [UsersUniversityNumbers]
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
    likes: [Likes]
    likesCnt: Int
    user: Users!
    comments: [Comments]
    commentsCnt: Int
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
    getUser(id: Int! ,favorite: Boolean ,universityNumber: Boolean ,posts: Boolean): Users
    getAllUser: [Users!]!
    getAllAds:[Ads]!
    getBansUser: [Bans]!
    getAllPostRequests: [PostRequests]!
    getPost(id: Int! ,like: Boolean ,comment: Boolean): Posts
    getAllComplaints: [Complaints]!
    getPosts(filter: String): [Posts]
    
    getAllPostOfSubject(subjectId: [Int]!): [Posts]! 
  }
  
  type Mutation {
    addPost(subjectId: Int ,type: String! ,title: String ,body: String! ,userId: Int!): Posts
    deletePost(id: Int!): Void
    approvalPostRequest(id: Int! ,cheack: Boolean!): PostRequests
    changeLike(userId: Int! ,postId: Int!): Void
    addComment(body: String! ,userId: Int! ,postId: Int!): Comments
    deleteComment(id: Int!):Void
    changeFavorite(userId: Int! ,postId: Int! ): Favorites
    changeBanUser(userId: Int! ,choise: Boolean): Bans
    addComplaint(userId: Int! ,title: String ,body: String!): Complaints
    changeDoneComplaint(id: Int! ,choise: Boolean): Complaints
    deleteComplaint(id: Int!): Void
    addUsersUniversityNumbers(userId: Int!,universityNumber: Int! ,year: String!): UsersUniversityNumbers
    deleteUsersUniversityNumbers(id: Int!): Void
    addAd(title: String! ,body: String! ,expireIn: Date!): Ads
    deleteAd(id: Int!): Void
  }
`;

//edit profile
//add image to post and ads
//cheack if ban and role befor any request

module.exports = typeDefs;