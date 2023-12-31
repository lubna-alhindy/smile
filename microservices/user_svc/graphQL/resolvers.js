const Controller = require('../controllers/Controller');

const resolvers = {
    Void: Controller.Helper.Void,
    Date: Controller.Helper.resolverMap,

    /// ------------------------- ///
    /// --------- Query --------- ///

    Query: {
        getUser: async (root, args, context ,info) =>
          Controller.User.getUser(args, context ,info),

        getAllUser: (root, args, context, info) =>
          Controller.User.getAllUser(context),

        getAllAds: (root, args, context, info) =>
          Controller.Ads.getAllAds(context),

        getBansUser: (root, args, context, info) =>
          Controller.User.getBansUser(context),

        getAllPostRequests: (root, args, context, info) =>
          Controller.Post.getAllPostRequests(args ,context),

        getPost: (root, args, context, info) =>
          Controller.Post.getPost(args ,context ,info),

        getAllComplaints: (root, args, context, info) =>
          Controller.Complaints.getAllComplaints(context),

        getPosts: (root, args, context, info) =>
          Controller.Post.getPosts(args ,context),

        getSpecialPosts: (root, args, context, info) =>
          Controller.Post.getSpecialPosts(args ,context),

        getBanState: (root ,args ,context ,info) =>
          Controller.User.getBanState(args ,context),

        checkToken: (root ,args ,context ,info) =>
          Controller.Auth.checkToken(args ,context),

        getSubjects: (root ,args ,context ,info) =>
          Controller.Post.getSubjects(args ,context),

        getGroupsOfUser: (root ,args ,context ,info) =>
          Controller.Post.getGroupsOfUser(args ,context),

        getUserUniversityNumbers: (root ,args ,context ,info) =>
          Controller.User.getUserUniversityNumbers(args ,context),

        getBannedUsersInGroup: (root ,args ,context ,info) =>
          Controller.User.getBannedUsersInGroup(args ,context),

        checkBanUsersInGroup: (root ,args ,context ,info) =>
          Controller.User.checkBanUsersInGroup(args ,context),

        getAllNotification: (root ,args ,context ,info) =>
          Controller.Notifications.getAllNotification(context),

        getNotification: (root ,args ,context ,info) =>
          Controller.Notifications.getNotification(args ,context),
    },

    /// ---------------------------- ///
    /// --------- Mutation --------- ///

    Mutation: {
        signup: (root ,args ,context, info) =>
          Controller.User.signup(args ,context),

        login: (root ,args ,context, info) =>
          Controller.User.login(args ,context),

        editProfile: (root ,args ,context, info) =>
          Controller.User.editProfile(args ,context),

        userChangePassword: (root ,args ,context, info) =>
          Controller.User.userChangePassword(args ,context),

        userDeleteAccount: (root ,args ,context, info) =>
          Controller.User.userDeleteAccount(args ,context),

        subervisorAddPost: (root, args, context, info) =>
          Controller.Post.subervisorAddPost(args ,context),

        addPost: (root, args, context, info) =>
          Controller.Post.addPost(args ,context),

        deletePost: (root, args, context, info) =>
          Controller.Post.deletePost(args ,context),

        approvalPostRequest: (root, args, context, info) =>
          Controller.Post.approvalPostRequest(args ,context),

        changeLike: (root, args , context, info) =>
          Controller.Post.changeLike(args ,context),

        addComment: (root, args , context, info) =>
          Controller.Post.addComment(args ,context),

        deleteComment: (root, args , context, info) =>
          Controller.Post.deleteComment(args ,context),

        changeFavorite: (root, args , context, info) =>
          Controller.Post.changeFavorite(args ,context),

        changeBanUser: (root, args, context, info) =>
          Controller.User.changeBanUser(args ,context),

        addComplaint: (root, args, context, info) =>
          Controller.Complaints.addComplaint(args ,context),

        changeDoneComplaint: (root, args, context, info) =>
          Controller.Complaints.changeDoneComplaint(args ,context),

        deleteComplaint: (root, args, context, info) =>
          Controller.Complaints.deleteComplaint(args ,context),

        addUsersUniversityNumber: (root, args, context, info) =>
          Controller.User.addUsersUniversityNumber(args ,context),

        deleteUsersUniversityNumber: (root, args, context, info) =>
          Controller.User.deleteUsersUniversityNumber(args ,context),

        addAd: (root, args, context, info) =>
          Controller.Ads.addAd(args ,context),

        updateAd: (root, args, context, info) =>
          Controller.Ads.updateAd(args ,context),

        deleteAd: (root, args, context, info) =>
          Controller.Ads.deleteAd(args ,context),

        changeUserRole: (root, args, context, info) =>
          Controller.User.changeUserRole(args ,context),

        adsDeleter: (root, args, context, info) =>
            Controller.Ads.adsDeleter(args ,context),

        changeBanUserInGroup: (root, args, context, info) =>
            Controller.User.changeBanUserInGroup(args ,context),

        sendNotification: (root, args, context, info) =>
            Controller.Notifications.sendNotification(args ,context),
    },
};

module.exports = resolvers;
