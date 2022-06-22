const Controller = require('../controllers/Controller');

const resolvers = {
    Void: Controller.Helper.Void,
    Date: Controller.Helper.resolverMap,

    /// ------------------------- ///
    /// --------- Query --------- ///

    Query: {
        getUser: (root, args, { models }) => 
            Controller.User.getUser(args ,models),

        getAllUser: (root, args, { models }) => 
            Controller.User.getAllUser(models),

        getAllAds: (root, args, { models }) => 
            Controller.Ads.getAllAds(models),

        getBansUser: (root, args, { models }) => 
            Controller.User.getBansUser(models),

        getAllPostRequests: (root, args, { models }) => 
            Controller.Post.getAllPostRequests(models),

        getPost: (root, args, { models }) =>
            Controller.Post.getPost(args ,models),

        getAllComplaints: (root, args, { models }) => 
            Controller.Complaints.getAllComplaints(models),

        getPosts: (root, args, { models }) => 
            Controller.Post.getPosts(args ,models),

        getAllPostOfSubject: (root, args, { models }) => 
            Controller.Post.getAllPostOfSubject(args ,models),
    },

    /// ---------------------------- ///
    /// --------- Mutation --------- ///

    Mutation: {
        signup: (root ,args ,{ models }) => 
            Controller.User.signup(args ,models),

        login: (root ,args ,{ models }) => 
            Controller.User.login(args ,models),

        editProfile: (root ,args ,{ models }) =>
            Controller.User.editProfile(args ,models),

        userDeleteAccount: (root ,args ,{ models }) =>
            Controller.User.userDeleteAccount(args ,models),

        addPost: (root, args, { models }) => 
            Controller.Post.addPost(args ,models),

        deletePost: (root, args, { models }) => 
            Controller.Post.deletePost(args ,models),

        approvalPostRequest: (root, args, { models }) => 
            Controller.Post.approvalPostRequest(args ,models),

        changeLike: (root, args , { models }) => 
            Controller.Post.changeLike(args ,models),

        addComment: (root, args , { models }) => 
            Controller.Post.addComment(args ,models),

        deleteComment: (root, args , { models }) => 
            Controller.Post.deleteComment(args ,models),

        changeFavorite: (root, args , { models }) => 
            Controller.Post.changeFavorite(args ,models),

        changeBanUser: (root, args, { models }) => 
            Controller.User.changeBanUser(args ,models),

        addComplaint: (root, args, { models }) => 
            Controller.Complaints.addComplaint(args ,models),

        changeDoneComplaint: (root, args, { models }) => 
            Controller.Complaints.changeDoneComplaint(args ,models),

        deleteComplaint: (root, args, { models }) => 
            Controller.Complaints.deleteComplaint(args ,models),

        addUsersUniversityNumbers: (root, args, { models }) => 
            Controller.User.addUsersUniversityNumbers(args ,models),

        deleteUsersUniversityNumbers: (root, args, { models }) => 
            Controller.User.deleteUsersUniversityNumbers(args ,models),

        addAd: (root, args, { models }) => 
            Controller.Ads.addAd(args ,models),

        deleteAd: (root, args, { models }) => 
            Controller.Ads.deleteAd(args ,models),
    },
};

module.exports = resolvers;
