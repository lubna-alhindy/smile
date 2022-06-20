const Helper = require('./Helper');

exports.getUser = async (args ,models) => {
    const user = await models.users.findOne({
        where:{
            id: args.id
        }
    });

    const editedUser = JSON.parse(JSON.stringify(user));

    if( args.favorite == true){
        const favorites = await models.favorites.findAll({
            where: {
                userId: args.id
            }
        });

        const favRes = [];
        for( const favorite of favorites){
            const editedFavorite = JSON.parse(JSON.stringify(favorite));

            editedFavorite.post = await models.posts.findOne({
                where: {
                    id: favorite.postId
                }
            });

            favRes.push(editedFavorite);
        }
        editedUser.favorites = favRes;
    }

    if( args.universityNumber == true){
        const usersUniversityNumbers = await models.usersUniversityNumbers.findAll({
            where:{
                userId: args.id
            }
        });
        editedUser.userUniversityNumbers = usersUniversityNumbers;
    }

    if( args.posts == true){
        const allPost = await models.posts.findAll({
            where:{
                userId: args.id
            }
        });

        const response = [];
        for(const post of allPost){
            const editedPost = JSON.parse(JSON.stringify(post));

            const likes = await models.likes.findAll({
                where:{
                    postId: post.id
                }
            });

            const likesRes = [];
            for( const like of likes) {
                const editedLike = JSON.parse(JSON.stringify(like));
                editedLike.user = await models.users.findOne({
                    where: {
                        id: like.userId
                    }
                });
                likesRes.push(editedLike);
            }
            editedPost.likes = likesRes;
            editedPost.likesCnt = editedPost.likes.length;

            const comments = await models.comments.findAll({
                where:{
                    postId: post.id
                }
            });

            const commentsRes = [];
            for( const comment of comments){
                const editedComment = JSON.parse(JSON.stringify(comment));
                editedComment.user = await models.users.findOne({
                    where: {
                        id: comment.userId
                    }
                });
                commentsRes.push(editedComment);
            }
            editedPost.comments = commentsRes;
            editedPost.commentsCnt = editedPost.comments.length;

            const user = await models.users.findOne({
                where:{
                    id: post.userId
                }
            });

            editedPost.user = user;
            response.push(editedPost);
        }
        editedUser.posts = response;
    }
    return editedUser;
};

exports.getAllUser = async (models) => {
    return await models.users.findAll();
}

exports.createUser = async (args ,models) => {
    let emailCnt = await models.users.count({
        where: {
            email: args.email
        },
        limit: 1
    });

    if( emailCnt === 1 ){
        return null;
    }

    return await models.users.create({
        email: args.email,
        lastName: args.lastName,
        firstName: args.firstName,
        roleName: args.roleName,
        password: await Helper.hashPassword(args.password),
    });

};


exports.banUser = async (args ,models) => {
    return await models.bans.create({
        userId: args.userId
    });
}

exports.unBanUser = async (args ,models) => {
    const banUser = await models.bans.findOne({
        where: {
            userId: args.userId
        }
    });
    await banUser.destroy();
}


exports.getBansUser = async (models) => {
    const bans = await models.bans.findAll({});

    const response = [];
    for( const ban of bans){
        const editedBan = JSON.parse(JSON.stringify(ban));

        editedBan.user = await models.users.findOne({
            where: {
                id: ban.userId
            }
        });

        response.push(editedBan);
    }

    return response;
}

exports.addUsersUniversityNumbers = async (args ,models) =>{
    return await models.usersUniversityNumbers.create({
        userId: args.userId,
        universityNumber: args.universityNumber,
        year: args.year
    });
}

exports.deleteUsersUniversityNumbers = async (args ,models) => {
    const usersUniversityNumbers  = await models.usersUniversityNumbers.findOne({
        where: {
            id: args.id
        }
    });

    await usersUniversityNumbers.destroy();
}