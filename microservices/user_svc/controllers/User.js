const Helper = require('./Helper');

exports.getUser = async (args ,models) => {
    const user = await models.users.findOne({
        where:{
            id: args.id
        }
    });

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

    const editedUser = JSON.parse(JSON.stringify(user));
    editedUser.favorites = favRes;

    const usersUniversityNumbers = await models.usersUniversityNumbers.findAll({
        where:{
            userId: args.id
        }
    });

    editedUser.userUniversityNumbers = usersUniversityNumbers;

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