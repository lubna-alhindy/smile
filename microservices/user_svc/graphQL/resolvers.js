const Controller = require('../controllers/Controller');

const resolvers = {
    Void: Controller.Helper.Void,
    Date: Controller.Helper.resolverMap,

    /// ------------------------- ///
    /// --------- Query --------- ///

    Query: {

    /*
        Notes for get the required fields:

            - you have to for loop over fieldNodes because each one is individual query

            - the required field name exist in this path:
                - info.fieldNodes[i].selectionSet.selections[j].name.value
            
            - you have to make a recursive function because there is types inside each other.

            - you have to make a string with the resault required fields and send it by graphql-request
              to the other services. 

            Example about level 0 get required fields:
            for(let i = 0 ; i < info.fieldNodes[0].selectionSet.selections.length ; i++){
                console.log(info.fieldNodes[0].selectionSet.selections[i].name.value)
            }

            output the full info about the request from info object:

            getUser: (root, args, context ,info) => {
                console.log(JSON.stringify(info.fieldNodes.length,null,2));
                return Controller.User.getUser(args ,context);
            }
    */

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
