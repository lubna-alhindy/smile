const {requiredFields, checkIfExist} = require('../graphQL/body');
const Helper = require('./Helper');

// -------------------------------- //

exports.signup = async (args, context) => {
  try {
    const emailCnt = await context.models.users.count({
      where: {
        email: args.email
      }
    });

    if (emailCnt === 1) {
      throw new Error("This email is already exist! Please try another one.");
    }
    if (!args.password || args.password.length < 8) {
      throw new Error('The password must be more than 7 characters');
    }

    const user = await context.models.users.create({
      email: args.email,
      roleName: "Student_",
      lastName: args.lastName,
      firstName: args.firstName,
      password: await Helper.hashPassword(args.password),
    })
      .catch(err => {
        throw new Error("Unknown Error occurred! Please try again.");
      });

    return {
      token: Helper.generateToken({
        id: user.id,
        email: user.email,
        roleName: user.roleName,
        class: null
      })
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

// -------------------------------- //

exports.login = async (args, context) => {
  try {
    const user = await context.models.users.findOne({
      where: {
        email: args.email
      }
    });

    if (!user || !await Helper.checkPassword(args.password, user.password)) {
      throw new Error('Your email or password is incorrect!');
    }

    return {
      token: Helper.generateToken({
        id: user.id,
        email: user.email,
        roleName: user.roleName,
        class: user.class
      })
    };

  } catch (err) {
    throw new Error(err.message);
  }
};

// -------------------------------- //

exports.editProfile = async (args, context) => {
  try {
    const user = await context.models.users.findOne({
      where: {
        id: args.id
      }
    });

    if (args.firstName !== undefined) {
      user.firstName = args.firstName;
    }
    if (args.lastName !== undefined) {
      user.lastName = args.lastName;
    }
    if (args.birthday !== undefined) {
      user.birthday = args.birthday;
    }
    if (args.bio !== undefined) {
      user.bio = args.bio;
    }
    if (args.class !== undefined) {
      user.class = args.class;
    }
    if (args.facebookURL !== undefined) {
      user.facebookURL = args.facebookURL;
    }
    if (args.telegramURL !== undefined) {
      user.telegramURL = args.telegramURL;
    }
    if (args.gmail !== undefined) {
      user.gmail = args.gmail;
    }

    let base64image = null;
    if (args.image !== undefined) {
      base64image = args.image.split(',')[1];
      const name = Helper.uniqueName("user" + "-" + user.id + "-" + user.lastName).concat(
        base64image[0] === "/"
          ? ".jpg"
          : base64image[0] === "i"
          ? ".png"
          : base64image[0] === "R"
            ? ".gif"
            : ".webp"
      );

      const image = await Helper.convertBase64ToImage(base64image);
      if (!await Helper.writeImage(image, name)) {
        throw new Error("Internal server error, try again");
      }
      user.image = name;
    }

    await user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

/// ------------------------------------ ///

exports.userChangePassword = async (args, context) => {
  try {
    if (args.newPassword1 !== args.newPassword2) {
      throw new Error("The new password doesn't match the confermation password!");
    }

    const user = await context.models.users.findOne({
      where: {
        id: args.id
      }
    });

    if (!await Helper.checkPassword(args.oldPassword, user.password)) {
      throw new Error('Your password is incorrect!');
    }
    if (args.newPassword1.length < 8) {
      throw new Error('The new password must be more than 7 characters');
    }

    user.password = await Helper.hashPassword(args.newPassword1);
    await user.save();

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// -------------------------------- //

exports.userDeleteAccount = async (args, context) => {
  try {
    const user = await context.models.users.findOne({
      where: {
        email: args.email
      },
      include: [{
        model: context.models.posts,
        include: {
          model: context.models.postImages
        }
      }, {
        model: context.models.postRequests,
        include: {
          model: context.models.postImages
        }
      }]
    });

    if (!user || !await Helper.checkPassword(args.password, user.password)) {
      throw new Error('Your email or password is incorrect!');
    }

    for (const post of user.posts) {
      for (let image of user.posts.postImages) {
        await Helper.deleteImage(image.name);
      }
    }

    for (const postRequest of user.postRequests) {
      for (let image of user.postRequests.postImages) {
        await Helper.deleteImage(image.name);
        await context.models.postImages.destroy({
          where: {
            id: image.id
          }
        });
      }
    }

    await user.destroy();
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.getUser = async (args, context, info) => {
  try {
    const body = await requiredFields(info);

    args.favorite = await checkIfExist(body, "favorites");
    args.universityNumber = await checkIfExist(body, "userUniversityNumbers");
    args.posts = await checkIfExist(body, "posts");

    const user = await context.models.users.findOne({
      where: {
        id: args.id
      }
    });

    if (user == null) {
      throw new Error('This User Not Exist!');
    }

    const editedUser = JSON.parse(JSON.stringify(user));

    if (args.favorite) {
      const favorites = await context.models.favorites.findAll({
        where: {
          userId: args.id
        }
      });

      const favRes = [];
      for (const favorite of favorites) {
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

    if (args.universityNumber) {
      editedUser.userUniversityNumbers = await context.models.usersUniversityNumbers.findAll({
        where: {
          userId: args.id
        }
      });
    }

    if (args.posts) {
      const allPost = await context.models.posts.findAll({
        where: {
          userId: args.id
        },
      });

      const response = [];
      for (const post of allPost) {
        const editedPost = JSON.parse(JSON.stringify(post));

        editedPost.likesCnt = await context.models.likes.count({
          where: {
            postId: post.id
          }
        });


        editedPost.commentsCnt = await context.models.comments.count({
          where: {
            postId: post.id
          }
        });

        response.push(editedPost);
      }
      editedUser.posts = response;
    }
    return editedUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

// -------------------------------- //

exports.getAllUser = async (context) => {
  try {
    const users = await context.models.users.findAll({
      include: context.models.bans
    });

    for (let user of users) {
      if (!user.ban) {
        user.isBaned = false;
      } else {
        user.isBaned = true;
      }
    }

    return users;
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.getBansUser = async (context) => {
  try {
    return await context.models.bans.findAll({
      include: {
        model: context.models.users
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.changeBanUser = async (args, context) => {
  try {
    const user = await context.models.users.findOne({
      where: {
        id: args.userId
      },
      include: {
        model: context.models.bans
      }
    });

    if (!user.ban) {
      user.isBaned = true;
      await context.models.bans.create({
        userId: args.userId
      });
    } else {
      user.isBaned = false;
      await context.models.bans.destroy({
        where: {
          id: user.ban.id
        }
      });
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.addUsersUniversityNumber = async (args, context) => {
  try {
    return await context.models.usersUniversityNumbers.create({
      userId: args.userId,
      universityNumber: args.universityNumber,
      year: args.year
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.deleteUsersUniversityNumber = async (args, context) => {
  try {
    const result = await context.models.usersUniversityNumbers.destroy({
      where: {
        id: args.id
      }
    });

    if (result === 0) {
      throw new Error("This university number doesn't exist");
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.getBanState = async (args, context) => {
  try {
    const user = await context.models.bans.findOne({
      where: {
        userId: args.id
      }
    });

    if (!user) {
      return false;
    }

    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.changeUserRole = async (args, context) => {
  try {
    const user = await context.models.users.findOne({
      where: {
        id: args.id
      }
    });

    user.roleName = args.roleName;
    if( !user.class ){
      user.class = args.roleName.split('_')[0];
    } else {
      const classes = ["First" , "Second" , "Third" , "Fourth" , "Fifth"];
      let flag = false;
      for(let i = 0; i < classes.length; i++){
        if( classes[i] === args.roleName.split('_')[0] ){
          flag = true;
        }
        if( classes[i] === user.class && !flag ){
          throw new Error("This user is not allowed to be admin of this group")
        }
      }
    }

    await user.save();

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.getUserUniversityNumbers = async (args, context) => {
  try {
    return await context.models.usersUniversityNumbers.findAll({
      where: {
        userId: args.id
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

// -------------------------------- //

exports.changeBanUserInGroup = async (args, context) => {
  try {
    if (args.group !== context.payload.roleName.split('_')[0]) {
      throw new Error("Unauthorized");
    }

    const user = await context.models.users.findOne({
      where: {
        id: args.userId
      },
      attributes: ["class"]
    });

    let flag = false;
    const classes = ["First", "Second", "Third", "Fourth", "Fifth"];
    for (let i = 0; i < classes.length; i++) {
      if (args.group === classes[i]) {
        flag = true;
      }
      if (args.group === user.class) {
        break;
      }
    }
    if (!flag) {
      throw new Error("Unauthorized");
    }

    let bannedInGroup = await context.models.bannedingroups.findOne({
      where: {
        userId: args.userId,
        group: args.group
      },
      include: {
        model: context.models.users
      }
    });

    if (!bannedInGroup) {
      bannedInGroup = await context.models.bannedingroups.create({
        userId: args.userId,
        group: args.group
      });

      bannedInGroup.user = await context.models.users.findOne({
        where: {
          id: args.userId
        }
      });

      bannedInGroup.isBanned = true;
    } else {
      await context.models.bannedingroups.destroy({
        where: {
          id: bannedInGroup.id
        }
      });

      bannedInGroup.isBanned = false;
    }

    return bannedInGroup;
  } catch (err) {
    throw new Error(err.message);
  }
};

// -------------------------------- //

exports.getBannedUsersInGroup = async (args ,context) => {
  try {
    if (args.group !== context.payload.roleName.split('_')[0]) {
      throw new Error("Unauthorized");
    }

    return await context.models.bannedingroups.findAll({
      where: {
        group: args.group
      },
      include: {
        model: context.models.users
      }
    });
  }
  catch(err) {
    throw new Error(err.message);
  }
};

// -------------------------------- //

exports.checkBanUsersInGroup = async (args ,context) => {
  try {
    let bannedInGroup = await context.models.bannedingroups.findOne({
      where: {
        userId: args.userId,
        group: args.group
      }
    });

    return !bannedInGroup ? false : true
  }
  catch(err) {
    throw new Error(err.message);
  }
};

// -------------------------------- //