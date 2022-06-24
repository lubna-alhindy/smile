const Controller = require('../controllers/Controller');

const resolvers = {
    Void: Controller.Helper.Void,
    Date: Controller.Helper.resolverMap,

    /// ------------------------- ///
    /// --------- Query --------- ///

    Query: {
        getUser: (root, args, context) => 
            Controller.User.getUser(args ,context),

        getAllUser: (root, args, context) => 
            Controller.User.getAllUser(context),

        getAllAds: (root, args, context) => 
            Controller.Ads.getAllAds(context),

        getBansUser: (root, args, context) => 
            Controller.User.getBansUser(context),

        getAllPostRequests: (root, args, context) => 
            Controller.Post.getAllPostRequests(context),

        getPost: (root, args, context) =>
            Controller.Post.getPost(args ,context),

        getAllComplaints: (root, args, context) => 
            Controller.Complaints.getAllComplaints(context),

        getPosts: (root, args, context) => 
            Controller.Post.getPosts(args ,context),

        getAllPostOfSubject: (root, args, context) => 
            Controller.Post.getAllPostOfSubject(args ,context),
    },

    /// ---------------------------- ///
    /// --------- Mutation --------- ///

    Mutation: {
        signup: (root ,args ,context) => 
            Controller.User.signup(args ,context),

        login: (root ,args ,context) => 
            Controller.User.login(args ,context),

        editProfile: (root ,args ,context) =>
            Controller.User.editProfile(args ,context),

        userDeleteAccount: (root ,args ,context) =>
            Controller.User.userDeleteAccount(args ,context),

        addPost: (root, args, context) => 
            Controller.Post.addPost(args ,context),

        deletePost: (root, args, context) => 
            Controller.Post.deletePost(args ,context),

        approvalPostRequest: (root, args, context) => 
            Controller.Post.approvalPostRequest(args ,context),

        changeLike: (root, args , context) => 
            Controller.Post.changeLike(args ,context),

        addComment: (root, args , context) => 
            Controller.Post.addComment(args ,context),

        deleteComment: (root, args , context) => 
            Controller.Post.deleteComment(args ,context),

        changeFavorite: (root, args , context) => 
            Controller.Post.changeFavorite(args ,context),

        changeBanUser: (root, args, context) => 
            Controller.User.changeBanUser(args ,context),

        addComplaint: (root, args, context) => 
            Controller.Complaints.addComplaint(args ,context),

        changeDoneComplaint: (root, args, context) => 
            Controller.Complaints.changeDoneComplaint(args ,context),

        deleteComplaint: (root, args, context) => 
            Controller.Complaints.deleteComplaint(args ,context),

        addUsersUniversityNumbers: (root, args, context) => 
            Controller.User.addUsersUniversityNumbers(args ,context),

        deleteUsersUniversityNumbers: (root, args, context) => 
            Controller.User.deleteUsersUniversityNumbers(args ,context),

        addAd: (root, args, context) => 
            Controller.Ads.addAd(args ,context),

        deleteAd: (root, args, context) => 
            Controller.Ads.deleteAd(args ,context),
    },
};

module.exports = resolvers;
