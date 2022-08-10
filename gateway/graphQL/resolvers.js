const Controller = require("../controllers/Controller");

const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/// ----------------------------------------------- ///

const resolvers = {
  Date: Controller.Helper.resolverMap,
  Void: Controller.Helper.Void,
  Upload: GraphQLUpload,

  /// ------------------------------ QUERY ------------------------------ ///

  Query: {
    /// ----------------------- QUIZ-SVC ----------------------- ///

      getQuizRequests: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "getQuizRequests", args),

      getQuizs: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "getQuizs", args),

    /// ----------------------- USER-SVC ----------------------- ///

      getUser: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getUser", args),

      getAllUser: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllUser", args),

      getBansUser: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getBansUser", args),

      getAllComplaints: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllComplaints", args),

      getBanState: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getBanState", args),

      getBannedUsersInGroup: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getBannedUsersInGroup", args),

    /// ----------------------- POST-SVC ----------------------- ///

      getAllAds: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllAds", args),

      getAllPostRequests: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllPostRequests", args),

      getPost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getPost", args),

      getSpecialPosts: async (root, args, context) => {
          const {id} = jwt.decode(context.token ,process.env.JWT_SECRET);
          const Class = jwt.decode(context.token ,process.env.JWT_SECRET).class;

          context.query["getUserUniversityNumbers"] = `query {
                getUserUniversityNumbers(id:${id}){
                  year
                  universityNumber
                }
              }`;
          const userUniversityNumbers =  await Controller.Connection.fetch(context, process.env.USER_URL, "getUserUniversityNumbers");
          let years = [] ,universityNumberss = [];
          for(let i of userUniversityNumbers){
              years.push('"' + i.year + '"');
              universityNumberss.push(i.universityNumber);
          }

          context.query["getUniversityNumbers"] = `query {
                getUniversityNumbers(years:[${years}] ,universityNumbers:[${universityNumberss}])
              }`
          const universityNumbers =  await Controller.Connection.fetch(context, process.env.MARKS_URL, "getUniversityNumbers");

          context.query["getSpecialSubjects"] = `query {
                getSpecialSubjects(class:${Class} ,universityNumbers:[${universityNumbers}])
              }`
          const subjectId =  await Controller.Connection.fetch(context, process.env.MARKS_URL, "getSpecialSubjects");
          if( args.type === undefined ) {
              context.query.getSpecialPosts = context.query.getSpecialPosts.substr(0, 21) + `(subjectId: [${subjectId}])` + context.query.getSpecialPosts.substr(21);
          } else {
              context.query.getSpecialPosts = context.query.getSpecialPosts.substr(0, 22) + `subjectId: [${subjectId}] ,` + context.query.getSpecialPosts.substr(22);
          }

          return await Controller.Connection.fetch(context, process.env.USER_URL, "getSpecialPosts");
      },

      getPosts: (root, args, context) =>
          Controller.Connection.fetch(context, process.env.USER_URL, "getPosts", args),

      getSubjects: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getSubjects", args),

      getGroupsOfUser: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getGroupsOfUser", args),


    /// ----------------------- LECTURE-SVC ----------------------- ///

      getSummary: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getSummary", args),

      getAllSummary: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getAllSummary", args),

      getLecture: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getLecture", args),

      getAllLecture: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getAllLecture", args),

      getWeeklySchedule: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getWeeklySchedule", args),/// ----------------------- LECTURE-SVC ----------------------- ///

    /// ----------------------- MARKS-SVC ----------------------- ///

      getMarksFiles: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.MARKS_URL, "getMarksFiles", args),

      getAllMarksFiles: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.MARKS_URL, "getAllMarksFiles", args),

      getUserMarks: async (root ,args ,context ,info) => {
          const {id} = jwt.decode(context.token ,process.env.JWT_SECRET);

          context.query["getUserUniversityNumbers"] = `query {
            getUserUniversityNumbers(id:${id}){
              year
              universityNumber
            }
          }`;
          const userUniversityNumbers =  await Controller.Connection.fetch(context, process.env.USER_URL, "getUserUniversityNumbers");
          let years = [] ,universityNumberss = [];
          for(let i of userUniversityNumbers){
            years.push('"' + i.year + '"');
            universityNumberss.push(i.universityNumber);
          }

          context.query["getUniversityNumbers"] = `query {
            getUniversityNumbers(years:[${years}] ,universityNumbers:[${universityNumberss}])
          }`
          const universityNumbers =  await Controller.Connection.fetch(context, process.env.MARKS_URL, "getUniversityNumbers");

          context.query["getUserMarks"] = `query {
          getUserMarks(class: ${args.class} ,type: ${args.type} ,universityNumberIds: [${universityNumbers}]){
            avg
            marks {
              id
              mark
              subject{
                id
                name
                class
                semester
                section
                type
                createdAt
                updatedAt
              }
              universityNumber{
                id
                universityNumber
                year
              }
            }
          }}`;

          return await Controller.Connection.fetch(context, process.env.MARKS_URL, "getUserMarks");
      },

  },

  /// ------------------------------ MUTATION ------------------------------ ///

  Mutation: {

    /// ----------------------- QUIZ-SVC ----------------------- ///

      addQuiz: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "addQuiz", args),

      deleteQuiz: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "deleteQuiz", args),

      approvalQuizRequest: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "approvalQuizRequest", args),

    /// ----------------------- USER-SVC ----------------------- ///

      signup: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "signup", args),

      login: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "login", args),

      editProfile: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "editProfile", args),

      userChangePassword: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "userChangePassword", args),

      userDeleteAccount: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "userDeleteAccount", args),

      changeBanUser: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeBanUser", args),

      addComplaint: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addComplaint", args),

      changeDoneComplaint: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeDoneComplaint", args),

      deleteComplaint: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deleteComplaint", args),

      addUsersUniversityNumber: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addUsersUniversityNumber", args),

      deleteUsersUniversityNumber: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deleteUsersUniversityNumber", args),

      changeUserRole: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeUserRole", args),

      changeBanUserInGroup: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeBanUserInGroup", args),

    /// ----------------------- POST-SVC ----------------------- ///

      subervisorAddPost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "subervisorAddPost", args),

      addPost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addPost", args),

      deletePost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deletePost", args),

      approvalPostRequest: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "approvalPostRequest", args),

      changeLike: (root, args , context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeLike", args),

      addComment: (root, args , context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addComment", args),

      deleteComment: (root, args , context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deleteComment", args),

      changeFavorite: (root, args , context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeFavorite", args),

      addAd: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addAd", args),

      updateAd: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "updateAd", args),

      deleteAd: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deleteAd", args),

    /// ----------------------- LECTURE-SVC ----------------------- ///

      addSummary: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "addSummary", args),

      deleteSummary: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "deleteSummary", args),

      addLecture: (root ,args ,context) =>
        Controller.Lecture.addLecture(args ,context),

      addWeeklySchedule: (root ,args ,context) =>
        Controller.WeeklySchedule.addWeeklySchedule(args ,context),

      deleteLecture: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "deleteLecture", args),

      deleteWeeklySchedule: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "deleteWeeklySchedule", args),

    /// ----------------------- MARKS-SVC ----------------------- ///

      deleteMarksFile: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.MARKS_URL, "deleteMarksFile", args),

      addMarksFile: (root ,args ,context) =>
        Controller.Marks.addMarksFile(args ,context),


  }
};

/// ----------------------------------------------- ///

module.exports = resolvers;