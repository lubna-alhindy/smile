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
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "getQuizRequests"),

      getQuizs: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "getQuizs"),

      getQuiz: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "getQuiz"),

    /// ----------------------- USER-SVC ----------------------- ///

      getUser: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getUser"),

      getAllUser: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllUser"),

      getBansUser: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getBansUser"),

      getAllComplaints: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllComplaints"),

      getBanState: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getBanState"),

      getBannedUsersInGroup: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getBannedUsersInGroup"),

      getUserUniversityNumbers: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getUserUniversityNumbers"),

      getAllNotification: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllNotification"),

      getNotification: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getNotification"),

    /// ----------------------- POST-SVC ----------------------- ///

      getAllAds: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllAds"),

      getAllPostRequests: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllPostRequests"),

      getPost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getPost"),

      getSpecialPosts: async (root, args, context) => {
          const {id} = jwt.decode(context.token ,process.env.JWT_SECRET);
          const Class = jwt.decode(context.token ,process.env.JWT_SECRET).class;

          context.query = `query {
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

          context.query = `query {
                getUniversityNumbers(years:[${years}] ,universityNumbers:[${universityNumberss}])
              }`
          const universityNumbers =  await Controller.Connection.fetch(context, process.env.MARKS_URL, "getUniversityNumbers");

          context.query = `query {
                getSpecialSubjects(class:${Class} ,universityNumbers:[${universityNumbers}])
              }`
          const subjectId =  await Controller.Connection.fetch(context, process.env.MARKS_URL, "getSpecialSubjects");
          if( args.type === undefined ) {
              context.query = context.query.substr(0, 21) + `(subjectId: [${subjectId}])` + context.query.substr(21);
          } else {
              context.query = context.query.substr(0, 22) + `subjectId: [${subjectId}] ,` + context.query.substr(22);
          }

          return await Controller.Connection.fetch(context, process.env.USER_URL, "getSpecialPosts");
      },

      getPosts: (root, args, context) =>
          Controller.Connection.fetch(context, process.env.USER_URL, "getPosts"),

      getSubjects: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getSubjects"),

      getGroupsOfUser: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getGroupsOfUser"),


    /// ----------------------- LECTURE-SVC ----------------------- ///

      getSummary: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getSummary"),

      getAllSummary: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getAllSummary"),

      getLecture: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getLecture"),

      getAllLecture: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getAllLecture"),

      getWeeklySchedule: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "getWeeklySchedule"),/// ----------------------- LECTURE-SVC ----------------------- ///

    /// ----------------------- MARKS-SVC ----------------------- ///

      getMarksFiles: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.MARKS_URL, "getMarksFiles"),

      getAllMarksFiles: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.MARKS_URL, "getAllMarksFiles"),

      getUserMarks: async (root ,args ,context ,info) => {
          const {id} = jwt.decode(context.token ,process.env.JWT_SECRET);

          context.query = `query {
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

          context.query = `query {
            getUniversityNumbers(years:[${years}] ,universityNumbers:[${universityNumberss}])
          }`
          const universityNumbers =  await Controller.Connection.fetch(context, process.env.MARKS_URL, "getUniversityNumbers");

          context.query = `query {
          getUserMarks(class: ${args.class} ,type: ${args.type} ,universityNumberIds: [${universityNumbers}]){
            avg
            marks {
              id
              mark
              universityNumberId
              subjectId
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
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "addQuiz"),

      deleteQuiz: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "deleteQuiz"),

      approvalQuizRequest: (root ,args ,context) =>
          Controller.Connection.fetch(context, process.env.QUIZ_URL, "approvalQuizRequest"),

    /// ----------------------- USER-SVC ----------------------- ///

      signup: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "signup"),

      login: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "login"),

      editProfile: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "editProfile"),

      userChangePassword: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "userChangePassword"),

      userDeleteAccount: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "userDeleteAccount"),

      changeBanUser: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeBanUser"),

      addComplaint: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addComplaint"),

      changeDoneComplaint: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeDoneComplaint"),

      deleteComplaint: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deleteComplaint"),

      addUsersUniversityNumber: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addUsersUniversityNumber"),

      deleteUsersUniversityNumber: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deleteUsersUniversityNumber"),

      changeUserRole: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeUserRole"),

      changeBanUserInGroup: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeBanUserInGroup"),

    /// ----------------------- POST-SVC ----------------------- ///

      subervisorAddPost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "subervisorAddPost"),

      addPost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addPost"),

      deletePost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deletePost"),

      approvalPostRequest: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "approvalPostRequest"),

      changeLike: (root, args , context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeLike"),

      addComment: (root, args , context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addComment"),

      deleteComment: (root, args , context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deleteComment"),

      changeFavorite: (root, args , context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "changeFavorite"),

      addAd: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "addAd"),

      updateAd: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "updateAd"),

      deleteAd: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "deleteAd"),

    /// ----------------------- LECTURE-SVC ----------------------- ///

      addSummary: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "addSummary"),

      deleteSummary: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "deleteSummary"),

      addLecture: async (root ,args ,context) => {
          const res = await Controller.Lecture.addLecture(args, context);
          context.query = `mutation {
            sendNotification(userId: null ,title: "Lectures", body: "New Lecture has been added")
          }`;
          await Controller.Connection.fetch(context ,process.env.USER_URL ,"sendNotification");
          return res
      },

      addWeeklySchedule: async (root ,args ,context) => {
          const res = await Controller.WeeklySchedule.addWeeklySchedule(args, context);
          context.query = `mutation {
            sendNotification(userId: null ,title: "Weekly Schedule", body: "Weekly Schedule has been added")
          }`;
          await Controller.Connection.fetch(context ,process.env.USER_URL ,"sendNotification");
          return res;
      },

      deleteLecture: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "deleteLecture"),

      deleteWeeklySchedule: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.LECTURE_URL, "deleteWeeklySchedule"),

    /// ----------------------- MARKS-SVC ----------------------- ///

      deleteMarksFile: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.MARKS_URL, "deleteMarksFile"),

      addMarksFile: async (root ,args ,context) => {
          const res = await Controller.Marks.addMarksFile(args, context);
          context.query = `mutation {
            sendNotification(userId: null ,title: "Marks", body: "New marks file has been added")
          }`;
          await Controller.Connection.fetch(context ,process.env.USER_URL ,"sendNotification");
          return res;
      },
  }
};

/// ----------------------------------------------- ///

module.exports = resolvers;