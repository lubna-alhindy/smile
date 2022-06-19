const Controller = require('../controllers/Controller');

const resolvers = {
    Date: Controller.Helper.resolverMap,
    Void: Controller.Helper.Void,

    Query: {
        getUser:  (root, args, { models }) => Controller.User.getUser(args ,models),
        getAllUser: (root, args, { models }) => Controller.User.getAllUser(models),
        getAllAds:(root, args, { models }) => Controller.Ads.getAllAds(models),
        getPost:(root, args, { models }) => Controller.Post.getPost(args,models),
        //to filter posts//
        getAllGeneralPost: (root, args, { models }) => Controller.Post.getAllGeneralPost(models),
        getAllPostOfUser: (root, args, { models }) => Controller.Post.getAllPostOfUser(args ,models),
        getAllPostOfSubject: (root, args, { models }) => Controller.Post.getAllPostOfSubject(args ,models),
        // end filter//

        getBansUser: (root, args, { models }) => Controller.User.getBansUser(models),
        getAllComplaints:(root, args, { models }) => Controller.Complaints.getAllComplaints(models),
        getAllPostRequests:(root, args, { models }) => Controller.Post.getAllPostRequests(models),
    },

    Mutation: {
        createUser:(root, args, { models }) => Controller.User.createUser(args ,models),
        addPost:(root, args, { models }) => Controller.Post.addPost(args ,models),
        like:(root, args , { models }) => Controller.Post.like(args ,models),
        addComment:(root, args , { models }) => Controller.Post.addComment(args ,models),
        deleteComment:(root, args , { models }) => Controller.Post.deleteComment(args ,models),
        addFavorite:(root, args , { models }) => Controller.Post.addFavorite(args ,models),
        deleteFavorite:(root, args , { models }) => Controller.Post.deleteFavorite(args ,models),
        banUser:(root, args, { models }) => Controller.User.banUser(args ,models),
        unBanUser:(root, args, { models }) => Controller.User.unBanUser(args ,models),
        addComplaint:(root, args, { models }) => Controller.Complaints.addComplaint(args ,models),
        deleteComplaint:(root, args, { models }) => Controller.Complaints.deleteComplaint(args ,models),
        makeComplaintAsDone:(root, args, { models }) => Controller.Complaints.makeComplaintAsDone(args ,models),
        addUsersUniversityNumbers:(root, args, { models }) => Controller.User.addUsersUniversityNumbers(args ,models),
        deleteUsersUniversityNumbers:(root, args, { models }) => Controller.User.deleteUsersUniversityNumbers(args ,models),
        approvalPostRequest:(root, args, { models }) => Controller.Post.approvalPostRequest(args ,models),

    }
};

module.exports = resolvers;
