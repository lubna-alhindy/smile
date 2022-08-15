const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  scalar Void
  
	enum Roles {
		Student_
		Admin_
		Public_Supervisor
		First_Supervisor
		Second_Supervisor
		Third_Supervisor
		Fourth_Supervisor
		Fifth_Supervisor
	}
	
	enum PostTypes {
		Advertisement
		Inquiry
	}
	
	enum SubjectTypes {
		Practical
		Theoretical
	}
	
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
  
  enum Groups {
    First
    Second
    Third
    Fourth
    Fifth
    Public
    Special
  }
  
	type Payload {
    id: Int!
    email: String!
    roleName: String!
	}

  type AuthPayload {
    token: String!
  }
  
  type subjects {
    id: Int!
    name: String!
    class: Class!
    semester: Semester!
    section: Section!
    type: SubjectTypes!
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
  
  type PostImage {
  	id: Int!
  	name: String!
  	postId: Int
  	postRequestId: Int
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
  
  type BannedInGroups {
    id: Int!
    userId: Int!
    group: Groups!
    user: Users
    isBanned: Boolean
    createdAt: Date
    updatedAt: Date
  }
  
  type Notifications {
    userId: Int!
    title: String
    body: String!
    isRead: Boolean
    createdAt: Date
    updatedAt: Date
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

    getAllPostRequests(group: Groups!)
      : [PostRequests]!

    getPost(id: Int!)
      : Posts

    getAllComplaints
      : [Complaints]!

    getPosts(type: PostTypes ,subjectId: [Int] ,group: Groups!)
      : [Posts]
      
    getSpecialPosts(subjectId: [Int]! ,type: PostTypes)
      : [Posts]
    
    getBanState(id: Int!)
    	: Boolean
    	
    checkToken(token: String!)
      : Payload
      
    getSubjects(semester: Semester ,group: Groups ,type: SubjectTypes)
      : [subjects]!
      
    getUserUniversityNumbers(id: Int!)
      : [UsersUniversityNumbers]!
      
    getGroupsOfUser
      : [Groups]!
      
    getBannedUsersInGroup(group: Groups!)
      : [BannedInGroups]!
      
    checkBanUsersInGroup(userId: Int! ,group: Groups!)
      : Boolean!
      
    getAllNotification
      : [Notifications]!
      
    getNotification(id: Int!)
      : Notifications
  }

  type Mutation {
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
      
    adsDeleter
       : Void
        
    changeBanUserInGroup(userId: Int! ,group: Groups!)
       : BannedInGroups
  }
`;

module.exports = typeDefs;