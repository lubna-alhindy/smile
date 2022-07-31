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

    /// ----------------------- POST-SVC ----------------------- ///

      getAllAds: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllAds"),

      getAllPostRequests: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getAllPostRequests"),

      getPost: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getPost"),

      getPosts: (root, args, context) =>
        Controller.Connection.fetch(context, process.env.USER_URL, "getPosts"),

      getAllPostOfSubject: (root, args, context) =>
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
  }
};

/// ----------------------------------------------- ///

module.exports = resolvers;