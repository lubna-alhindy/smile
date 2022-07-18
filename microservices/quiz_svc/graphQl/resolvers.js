const Controller = require('../controllers/Controller');

const resolvers = {
    Void: Controller.Helper.Void,
    Date: Controller.Helper.resolverMap,

    Query: {
        getQuizRequests: (root ,args ,context) =>
            Controller.Quiz.getQuizRequests(args ,context),

        getQuizs: (root ,args ,context) =>
            Controller.Quiz.getQuizs(args ,context),
    },

    Mutation: {
        addQuiz: (root ,args ,context) =>
            Controller.Quiz.addQuiz(args ,context),

        deleteQuiz: (root ,args ,context) =>
            Controller.Quiz.deleteQuiz(args ,context),

        approvalQuizRequest: (root ,args ,context) =>
            Controller.Quiz.approvalQuizRequest(args ,context),
    },
};

module.exports = resolvers;
