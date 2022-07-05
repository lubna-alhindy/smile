const Helper = require('./Helper');

exports.signup = async (args ,context) => {
    const emailCnt = await context.models.users.count({
        where: {
            email: args.email
        },
        limit: 1
    });

    if( emailCnt === 1 ){
        throw new Error("This email is already exist! Please try another one.");
    }

    const user = await context.models.users.create({
        email: args.email,
        roleName: "Student",
        lastName: args.lastName,
        firstName: args.firstName,
        password: await Helper.hashPassword(args.password),
    })
    .catch(err => {
        throw new Error("Unknown Error occurred! Please try again.");
    });

    return {
        user: user,
        token: Helper.generateToken({
            id: user.id,
            email: user.email
        })
    };
};

exports.login = async (args ,context) => {
    const user = await context.models.users.findOne({
        where: {
            email: args.email
        }
    })
    .catch(err => {
        throw new Error("Unknown Error occurred! Please try again.");
    });

    if( !user ||  !await Helper.checkPassword(args.password, user.password) ){
        throw new Error('Your email or password is incorrect!');
    }

    return {
        user: user,
        token: Helper.generateToken({
            id: user.id,
            email: user.email
        })
    };
};

exports.editProfile = async (args ,context) => {
    const user = await context.models.users.findOne({
        where: {
            id: args.id
        }
    });

    user.firstName = args.firstName;
    user.lastName = args.lastName;
    user.birthday = args.birthday
    user.bio = args.bio
    user.class = args.class
    user.facebookURL = args.facebookURL
    user.telegramURL = args.telegramURL
    user.gmail = args.gmail

    const name = Helper.uniqueName("user" + "-" + args.id  + "-" + args.lastName );

    const base64image = args.image.split(',')[1];
    const image = await Helper.convertBase64ToImage(base64image);

    await Helper.writeImage(image ,name);

    user.image = args.image;


    if( args.oldPassword != null ){
        if( !await Helper.checkPassword(args.oldPassword, user.password) ){
            throw new Error('Your password is incorrect!');
        }
        if(args.firstNewPassword != null || args.secondNewPassword != null ){
            if( args.firstNewPassword != args.secondNewPassword ) {
                throw new Error('The First Password does not match the Second Password!');
            }
        }
        user.password= await Helper.hashPassword(args.firstNewPassword);
    }

    await user.save();
    return user;
}

exports.userDeleteAccount = async (args ,context) => {
    const user = await context.models.users.findOne({
        where: {
            email: args.email
        }
    })
    .catch(err => {
        throw new Error("Unknown Error occurred! Please try again.");
    });

    if( !user ||  !await Helper.checkPassword(args.password, user.password) ){
        throw new Error('Your email or password is incorrect!');
    }

    const ban = await context.models.bans.findOne({
        where: {
            userId: user.id
        }
    });
    if( ban ) await ban.destroy();

    const complaints = await context.models.complaints.findAll({
        where: {
            userId: user.id
        }
    });
    for( const complaint of complaints)
         await complaint.destroy();

    const favorites = await context.models.favorites.findAll({
        where: {
            userId: user.id
        }
    });
    for( const favorite of favorites)
        await favorite.destroy();

    const comments = await context.models.comments.findAll({
        where: {
            userId: user.id
        }
    });
    for( const comment of comments)
        await comment.destroy();

    const likes = await context.models.likes.findAll({
        where: {
            userId: user.id
        }
    });
    for( const like of likes)
        await like.destroy();

    const usersUniversityNumbers = await context.models.usersUniversityNumbers.findAll({
        where:{
            userId: user.id
        }
    });

    for( const usersUniversityNumber of usersUniversityNumbers)
        await usersUniversityNumber.destroy();

    const posts = await context.models.posts.findAll({
        where: {
            userId: user.id
        },
        include: {
            model: context.models.postImages
        }
    });

    for( const post of posts){
        for(let image of post.postImages){
            await context.models.postImages.destroy({
                where: {
                    id: image.id
                }
            });
        }
        await post.destroy();
    }


    const postRequests = await context.models.postRequests.findAll({
        where: {
            userId: user.id
        },
        include: {
            model: context.models.postImages
        }
    });

    for( const postRequest of postRequests){
        for(let image of postRequest.postImages){
            await context.models.postImages.destroy({
                where: {
                    id: image.id
                }
            });
        }
        await postRequest.destroy();
    }

    await user.destroy();
}

exports.getUser = async (args ,context) => {
    const user = await context.models.users.findOne({
        where:{
            id: args.id
        }
    });

    if( user == null ){
        throw new Error('This User Not Exist!');
    }

    const editedUser = JSON.parse(JSON.stringify(user));

    if( args.favorite == true){
        const favorites = await context.models.favorites.findAll({
            where: {
                userId: args.id
            }
        });

        const favRes = [];
        for( const favorite of favorites){
            const editedFavorite = JSON.parse(JSON.stringify(favorite));

            editedFavorite.post = await context.models.posts.findOne({
                where: {
                    id: favorite.postId
                }
            });

            favRes.push(editedFavorite);
        }
        editedUser.favorites = favRes;
    }

    if( args.universityNumber == true){
        const usersUniversityNumbers = await context.models.usersUniversityNumbers.findAll({
            where:{
                userId: args.id
            }
        });
        editedUser.userUniversityNumbers = usersUniversityNumbers;
    }

    if( args.posts == true){
        const allPost = await context.models.posts.findAll({
            where:{
                userId: args.id
            }
        });

        const response = [];
        for(const post of allPost){
            const editedPost = JSON.parse(JSON.stringify(post));

            const likes = await context.models.likes.findAll({
                where:{
                    postId: post.id
                }
            });

            const likesRes = [];
            for( const like of likes) {
                const editedLike = JSON.parse(JSON.stringify(like));
                editedLike.user = await context.models.users.findOne({
                    where: {
                        id: like.userId
                    }
                });
                likesRes.push(editedLike);
            }
            editedPost.likes = likesRes;
            editedPost.likesCnt = editedPost.likes.length;

            const comments = await context.models.comments.findAll({
                where:{
                    postId: post.id
                }
            });

            const commentsRes = [];
            for( const comment of comments){
                const editedComment = JSON.parse(JSON.stringify(comment));
                editedComment.user = await context.models.users.findOne({
                    where: {
                        id: comment.userId
                    }
                });
                commentsRes.push(editedComment);
            }
            editedPost.comments = commentsRes;
            editedPost.commentsCnt = editedPost.comments.length;

            const user = await context.models.users.findOne({
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

exports.getAllUser = async (context) => {
    return await context.models.users.findAll();
}

exports.getBansUser = async (context) => {
    const bans = await context.models.bans.findAll();

    const response = [];
    for( const ban of bans){
        const editedBan = JSON.parse(JSON.stringify(ban));

        editedBan.user = await context.models.users.findOne({
            where: {
                id: ban.userId
            }
        });

        response.push(editedBan);
    }

    return response;
}

exports.changeBanUser = async (args ,context) => {
    if( args.choise == true ){
        return await context.models.bans.create({
            userId: args.userId
        });
    }
    else {
        const banUser = await context.models.bans.findOne({
            where: {
                userId: args.userId
            }
        });
        if( banUser == null ){
            throw new Error("This user is not banned !")
        }
        await banUser.destroy();
    }
}

exports.addUsersUniversityNumbers = async (args ,context) =>{
    return await context.models.usersUniversityNumbers.create({
        userId: args.userId,
        universityNumber: args.universityNumber,
        year: args.year
    });
}

exports.deleteUsersUniversityNumbers = async (args ,context) => {
    const usersUniversityNumbers  = await context.models.usersUniversityNumbers.findOne({
        where: {
            id: args.id
        }
    });
    if( usersUniversityNumbers == null ){
        throw new Error("This user is not banned")
    }
    await usersUniversityNumbers.destroy();
}