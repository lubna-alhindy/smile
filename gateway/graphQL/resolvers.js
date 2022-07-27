const Controller = require("../controllers/Controller");

const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
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

    /// ----------------------- USER-SVC ----------------------- ///

      getUser: (root, args, context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getUser"),

      getAllUser: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllUser"),

      getBansUser: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getBansUser"),

      getAllComplaints: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllComplaints"),

      getBanState: (root ,args ,context ,info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getBanState"),

    /// ----------------------- POST-SVC ----------------------- ///

      getAllAds: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllAds"),

      getAllPostRequests: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllPostRequests"),

      getPost: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getPost"),

      getPosts: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getPosts"),

      getAllPostOfSubject: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllPostOfSubject"),

  },

  /// ------------------------------ MUTATION ------------------------------ ///

  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const out = require('fs').createWriteStream('local-file-output.jpg');
      await stream.pipe(out);
      return { filename, mimetype, encoding };
    },

    /// ----------------------- QUIZ-SVC ----------------------- ///

      addQuiz: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "addQuiz"),

      deleteQuiz: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "deleteQuiz"),

      approvalQuizRequest: (root ,args ,context) =>
        Controller.Connection.fetch(context, process.env.QUIZ_URL, "approvalQuizRequest"),

    /// ----------------------- USER-SVC ----------------------- ///

      signup: (root ,args ,context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "signup"),

      login: (root ,args ,context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "login"),

      editProfile: (root ,args ,context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "editProfile"),

      userChangePassword: (root ,args ,context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "userChangePassword"),

      userDeleteAccount: (root ,args ,context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "userDeleteAccount"),

      changeBanUser: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "changeBanUser"),

      addComplaint: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "addComplaint"),

      changeDoneComplaint: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "changeDoneComplaint"),

      deleteComplaint: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "deleteComplaint"),

      addUsersUniversityNumber: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "addUsersUniversityNumber"),

      deleteUsersUniversityNumber: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "deleteUsersUniversityNumber"),

      changeUserRole: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "changeUserRole"),

    /// ----------------------- POST-SVC ----------------------- ///

      subervisorAddPost: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "subervisorAddPost"),

      addPost: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "addPost"),

      deletePost: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "deletePost"),

      approvalPostRequest: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "approvalPostRequest"),

      changeLike: (root, args , context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "changeLike"),

      addComment: (root, args , context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "addComment"),

      deleteComment: (root, args , context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "deleteComment"),

      changeFavorite: (root, args , context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "changeFavorite"),

      addAd: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "addAd"),

      updateAd: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "updateAd"),

      deleteAd: (root, args, context, info) =>
        Controller.Connection.fetch(context, process.env.USER_SVC, "deleteAd"),
  }
};

/// ----------------------------------------------- ///

module.exports = resolvers;