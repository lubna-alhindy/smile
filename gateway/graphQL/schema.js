const {gql} = require('apollo-server-express');

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
      First_Supervisor
      Second_Supervisor
      Third_Supervisor
      Fourth_Supervisor
      Fifth_Supervisor
	  }
	
  # ------------------------------------- POST-SVC ------------------------------------- #
  
    enum SubjectTypes {
      Practical
      Theoretical
    }
    
    enum Groups {
      First
      Second
      Third
      Fourth
      Fifth
      General
      Special
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

  # --------------------------------- LECTURE-SVC --------------------------------- #
  
  	enum LectureTypes {
      RBCs
      Other
      Binary
      Slides
      References
      StudentWrite
    }
  
    type summarys {
      id: Int!
      subjectId: Int!
      title: String!
      body: String!
      subject: subjects
      createdAt: Date
      updatedAt: Date
    }
    
    type weeklyschedules {
      id: Int!
      url: String!
      year: String!
      createdAt: Date
      updatedAt: Date
    }
    
    type lectures{
      subjectId: Int!
      url: String!
      year: String!
      type: LectureTypes!
      subject: subjects
      createdAt: Date
      updatedAt: Date
    }
    
  # --------------------------------- MARKS-SVC --------------------------------- #
      
    type universitynumbers{
      id: Int!
      universityNumber: Int!
      year: String!
    }
  
    type marksfiles {
      id: Int!
      subjectId: Int!
      url: String!
      year: String!
      subject: subjects
      createdAt: Date
      updatedAt: Date
    }  
    
    type subjectsuniversitynumbers {
      id: Int!
      universityNumberId: Int!
      subjectId: Int!
      mark: Int!
      subject: subjects!
      universityNumber: universitynumbers
    }

    type Marks {
      avg: Float!
      marks: [subjectsuniversitynumbers]!
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
    
        getAllPostRequests(group: Groups!)
          : [PostRequests]!
    
        getPost(id: Int! ,like: Boolean ,comment: Boolean)
          : Posts
    
        getPosts(type: PostTypes ,subjectId: [Int] ,group: Groups!)
          : [Posts]
        
        getSpecialPosts(type: PostTypes)
          : [Posts]
      
        getSubjects(semester: Semester ,group: Groups ,type: SubjectTypes)
          : [subjects]!
        
        getGroupsOfUser
          : [Groups]!
          
      # --------------------------------- LECTURE-SVC --------------------------------- #

        getSummary(id: Int!)
          : summarys
          
        getAllSummary(class: Class ,semester: Semester ,type: SubjectTypes)
          : [summarys]!
        
        getLecture(id: Int!)
          : lectures
          
        getAllLecture(class: Class ,semester: Semester ,type: SubjectTypes ,lectureType: LectureTypes ,year: String)
          : [lectures]!
        
        getWeeklySchedule(year: String!)
          : weeklyschedules
          
      # --------------------------------- MARKS-SVC --------------------------------- #
      
        getMarksFiles(id: Int!)
          : marksfiles
      
        getAllMarksFiles(class: Class ,semester: Semester ,type: SubjectTypes ,year: String)
          : [marksfiles]!
          
        getUserMarks(class: Class! ,type: SubjectTypes)
          : Marks
    }

  # ------------------------------------- MUTATION ------------------------------------- #

    type Mutation {
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
      
      # --------------------------------- LECTURE-SVC --------------------------------- #
      
        addSummary(subjectId: Int! ,title: String! ,body: String!)
           : summarys
          
        deleteSummary(id: Int!)
           : Void
    
        deleteLecture(id: Int!)
           : Void
           
        deleteWeeklySchedule(id: Int!)
           : Void
           
        addLecture(file: Upload!)
           : File!
           
        addWeeklySchedule(file: Upload!)
           : File!
           
      # --------------------------------- MARKS-SVC --------------------------------- #
      
        addMarksFile(file: Upload!)
          : File!
         
        deleteMarksFile(id: Int!)
           : Void
    }
`;

/// ------------------------------------------------------------------------------------ ///

module.exports = typeDefs;

/*
{
    "query": "mutation addLecture($file: Upload!) { addLecture(file: $file) { filename mimetype encoding }}",
    "variables":
    {
        "data":
        {
          "year": "2002",
          "subjectId": 1
        }
    }
}
*/