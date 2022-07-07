const {requiredFields ,checkIfExist} = require('../graphQL/body');
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
    if( !args.password || args.password.length < 8 ) {
        throw new Error('The password must be more than 7 characters');
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
    user.bio = args.bio;
    user.class = args.class;
    user.facebookURL = args.facebookURL;
    user.telegramURL = args.telegramURL;
    user.gmail = args.gmail;

    const name = Helper.uniqueName("user" + "-" + args.id  + "-" + args.lastName );
    const base64image = args.image.split(',')[1];
    const image = await Helper.convertBase64ToImage(base64image);
    if( !await Helper.writeImage(image ,name) ){
        throw new Error("Internal server error, try again");
    }

    user.image = name;
    if( args.oldPassword != null ){
        if( !await Helper.checkPassword(args.oldPassword, user.password) ){
            throw new Error('Your password is incorrect!');
        }
        if( !args.firstNewPassword || !args.secondNewPassword ) {
            throw new Error('The password must be more than 7 characters');
        }
        if( args.firstNewPassword.length < 8 || args.secondNewPassword.length < 8 ) {
            throw new Error('The password must be more than 7 characters');
        }
        if( args.firstNewPassword !== args.secondNewPassword ) {
            throw new Error('The First Password does not match the Second Password!');
        }
        user.password = await Helper.hashPassword(args.firstNewPassword);
    }
    else {
        if( args.firstNewPassword != null ){
            throw new Error('Please enter the current password');
        }
    }

    await user.save();
    user.image = base64image;
    return user;
}

exports.userDeleteAccount = async (args ,context) => {
    const user = await context.models.users.findOne({
        where: {
            email: args.email
        },
        include: [{
            model: context.models.posts,
            include: {
                model: context.models.postImages
            }
        },{
            model: context.models.postRequests,
            include: {
                model: context.models.postImages
            }
        }]
    });

    if( !user || !await Helper.checkPassword(args.password, user.password) ){
        throw new Error('Your email or password is incorrect!');
    }

    for(const post of user.posts){
        for(let image of user.posts.postImages){
            await Helper.deleteImage(image.name);
        }
    }

    for(const postRequest of user.postRequests){
        for(let image of user.postRequests.postImages){
            await Helper.deleteImage(image.name);
            await context.models.postImages.destroy({
                where: {
                    id: image.id
                }
            });
        }
    }

    await user.destroy();
}

exports.getUser = async (args ,context ,info) => {
    const body = await requiredFields(info);

    args.favorite = await checkIfExist(body ,"favorites");
    args.universityNumber = await checkIfExist(body ,"userUniversityNumbers");
    args.posts = await checkIfExist(body ,"posts");

    const user = await context.models.users.findOne({
        where:{
            id: args.id
        }
    });

    if( user == null ){
        throw new Error('This User Not Exist!');
    }

    const editedUser = JSON.parse(JSON.stringify(user));

    if( args.favorite ){
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

    if( args.universityNumber ){
        editedUser.userUniversityNumbers = await context.models.usersUniversityNumbers.findAll({
            where: {
                userId: args.id
            }
        });
    }

    if( args.posts ){
        const allPost = await context.models.posts.findAll({
            where:{
                userId: args.id
            },
        });

        const response = [];
        for(const post of allPost){
            const editedPost = JSON.parse(JSON.stringify(post));

            editedPost.likesCnt = await context.models.likes.count({
                where:{
                    postId: post.id
                }
            });


            editedPost.commentsCnt = await context.models.comments.count({
                where:{
                    postId: post.id
                }
            });

            response.push(editedPost);
        }
        editedUser.posts = response;
    }
    return editedUser;
};

exports.getAllUser = async (context) => {
    const users = await context.models.users.findAll({
        include: context.models.bans
      }
    );

    for(let user of users) {
        if (!user.ban) {
            user.isBaned = false;
        } else {
            user.isBaned = true;
        }
    }

    return users;
}

exports.getBansUser = async (context) => {
    return await context.models.bans.findAll({
        include: {
            model: context.models.users
        }
    });
}

exports.changeBanUser = async (args ,context) => {
    const user = await context.models.users.findOne({
        where: {
            id: args.userId
        },
        include: {
            model: context.models.bans
        }
    });

    if( !user.ban ){
        user.isBaned = true;
        await context.models.bans.create({
            userId: args.userId
        });
    }
    else {
        user.isBaned = false;
        await context.models.bans.destroy({
            where: {
                id: user.ban.id
            }
        });
    }

    return user;
}

exports.addUsersUniversityNumber = async (args ,context) =>{
    return await context.models.usersUniversityNumbers.create({
        userId: args.userId,
        universityNumber: args.universityNumber,
        year: args.year
    });
}

exports.deleteUsersUniversityNumber = async (args ,context) => {
    const usersUniversityNumbers  = await context.models.usersUniversityNumbers.findOne({
        where: {
            id: args.id
        }
    });

    if( !usersUniversityNumbers ){
        throw new Error("This user is not found");
    }

    await usersUniversityNumbers.destroy();
}