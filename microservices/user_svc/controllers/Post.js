const {Sequelize, Op} = require('sequelize');
const Helper = require('./Helper');

// -------------------------------- //

exports.getPost = async (args, context) => {
  try {
    const post = await context.models.posts.findOne({
      where: {
        id: args.id
      },
      include: [{
        model: context.models.postImages
      }, {
        model: context.models.subjects
      }]
    });
    const editedPost = JSON.parse(JSON.stringify(post));

    if (args.like === true) {
      const likes = await context.models.likes.findAll({
        where: {
          postId: post.id
        }
      });

      const likesRes = [];
      for (const like of likes) {
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
    }

    if (args.comment === true) {
      const comments = await context.models.comments.findAll({
        where: {
          postId: post.id
        }
      });

      const commentsRes = [];
      for (const comment of comments) {
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
    }

    editedPost.user = await context.models.users.findOne({
      where: {
        id: post.userId
      }
    });

    return editedPost;
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.getSpecialPosts = async (args ,context) => {
  const posts = await context.models.posts.findAll({
    where: {
      type: args.type !== undefined ? args.type : {
        [Op.ne]: null
      },
      subjectId: args.subjectId
    },

    include: [{
      model: context.models.postImages,
      attributes: ['name']
    }, {
      model: context.models.users,
      attributes: ['firstName', 'lastName', 'image', 'class']
    }, {
      model: context.models.likes,
      attributes: ['id']
    }, {
      model: context.models.comments,
      attributes: ['id']
    }, {
      model: context.models.subjects,
    }]
  });

  for (let post of posts) {
    post.likesCnt = post.likes.length;
    post.commentsCnt = post.comments.length;
  }

  return posts;
}

// -------------------------------- //

async function getGeneralPosts(args ,context){
  const posts = await context.models.posts.findAll({
    where: {
      type: args.type !== undefined ? args.type : {
        [Op.ne]: null
      },
      subjectId: null
    },

    include: [{
      model: context.models.postImages,
      attributes: ['name']
    }, {
      model: context.models.users,
      attributes: ['firstName', 'lastName', 'image', 'class']
    }, {
      model: context.models.likes,
      attributes: ['id']
    }, {
      model: context.models.comments,
      attributes: ['id']
    }]
  });

  for (let post of posts) {
    post.likesCnt = post.likes.length;
    post.commentsCnt = post.comments.length;
  }

  return posts;
}

// -------------------------------- //

exports.getPosts = async (args, context) => {
  try {
    if( args.group === "Public" ){
      return await getGeneralPosts(args ,context);
    }

    const posts = await context.models.posts.findAll({
      where: {
        type: args.type !== undefined ? args.type : {
          [Op.ne]: null
        },

        subjectId: args.subjectId !== undefined ? args.subjectId : {
          [Op.or]: [{
            [Op.ne]: null
          }, {
            [Op.eq]: null
          }]
        }
      },

      include: [{
        model: context.models.postImages,
        attributes: ['name']
      }, {
        model: context.models.users,
        attributes: ['firstName', 'lastName', 'image', 'class']
      }, {
        model: context.models.likes,
        attributes: ['id']
      }, {
        model: context.models.comments,
        attributes: ['id']
      }, {
        model: context.models.subjects,
        where: {
          class: args.group
        }
      }]
    });

    for (let post of posts) {
      post.likesCnt = post.likes.length;
      post.commentsCnt = post.comments.length;
    }

    return posts;
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.addPost = async (args, context) => {
  try {
    const post = await context.models.postRequests.create({
      subjectId: args.subjectId,
      userId: args.userId,
      title: args.title,
      type: args.type,
      body: args.body
    });

    post["postImages"] = [];
    for (let i = 0; i < args.images.length; i++) {
      const base64image = args.images[i].split(',')[1];
      const name = Helper.uniqueName("posts" + "-" + post.id + "-" + i).concat(
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
        throw new Error("Ibternal server error, please try again");
      }

      post["postImages"].push(await context.models.postImages.create({
        name: await Helper.getImagePath(name),
        postRequestId: post.id
      }));
    }

    return post;
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.subervisorAddPost = async (args, context) => {
  try {
    const subjects = !args.subjectId ? {class: "Public"} : await context.models.subject.findOne({
      where: {
        id: args.subjectId
      }
    });

    if (subjects.group !== context.payload.roleName.split('_')[0] && context.payload.roleName.split('_')[0] !== "Admin") {
      throw new Error("Unauthorized");
    }

    const post = await context.models.posts.create({
      subjectId: args.subjectId,
      userId: args.userId,
      title: args.title,
      type: args.type,
      body: args.body
    });

    post["postImages"] = [];
    for (let i = 0; i < args.images.length; i++) {
      const base64image = args.images[i].split(',')[1];
      const name = Helper.uniqueName("posts" + "-" + post.id + "-" + i).concat(
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
        throw new Error("Internal server error, please try again");
      }

      post["postImages"].push(await context.models.postImages.create({
        name: await Helper.getImagePath(name),
        postId: post.id
      }));
    }

    return post;
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.deletePost = async (args, context) => {
  try {
    const post = await context.models.posts.findOne({
      where: {
        id: args.id
      },
      include: [{
        model: context.models.postImages
      },{
        model: context.models.subjects
      }]
    });

    if (post === null) {
      throw new Error("This Post is not found!");
    }

    if (post.userId !== context.payload.id) {
      if (context.payload.roleName !== "Admin_" && context.payload.roleName.split("_")[0] !== post.subject.class) {
        throw new Error("Unauthorized");
      }
    }

    for (let image of post.postImages) {
      await Helper.deleteImage(image.name);
    }

    await post.destroy();
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.getAllGeneralPostRequests = async (context) => {
  try {
    return await context.models.postRequests.findAll({
      where: {
        subjectId: null,
      },
      include: [{
        model: context.models.postImages
      }, {
        model: context.models.users
      }]
    });
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.getAllPostRequests = async (args ,context) => {
  try {
    if (args.group !== context.payload.roleName.split('_')[0] && context.payload.roleName.split('_')[0] !== "Admin"){
      throw new Error("Unauthorized");
    }

    if( args.group === "Public" ){
      return await getAllGeneralPostRequests(args, context);
    }

    return await context.models.postRequests.findAll({
      include: [{
        model: context.models.postImages
      }, {
        model: context.models.users
      }, {
        model: context.models.subjects,
        where: {
          class: args.group
        }
      }]
    });
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.approvalPostRequest = async (args, context) => {
  try {
    const postRequest = await context.models.postRequests.findOne({
      where: {
        id: args.id
      },
      include: [{
        model: context.models.postImages
      },{
        model: context.models.subjects
      }]
    });

    if( !postRequest.subject ){
      postRequest.subject = {class: "Public"};
    }

    if (postRequest.subject.group !== context.payload.roleName.split('_')[0] && context.payload.roleName.split('_')[0] !== "Admin"){
      throw new Error("Unauthorized");
    }

    if (args.choice === true) {
      const post = await context.models.posts.create({
        subjectId: postRequest.subjectId,
        type: postRequest.type,
        title: postRequest.title,
        body: postRequest.body,
        userId: postRequest.userId
      });

      for (let image of postRequest.postImages) {
        await context.models.postImages.update({
          postRequestId: null,
          postId: post.id
        }, {
          where: {
            id: image.id
          }
        });
      }
    } else {
      for (let image of postRequest.postImages) {
        await Helper.deleteImage(image.name);
        await context.models.postImages.destroy({
          where: {
            id: image.id
          }
        });
      }
    }

    await postRequest.destroy();
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.changeLike = async (args, context) => {
  try {
    const post = await context.models.posts.findOne({
      where: {
        id: args.postId
      }
    });

    const like = await context.models.likes.findOne({
      where: {
        postId: args.postId,
        userId: args.userId
      }
    });

    if (!like) {
      post.isLiked = true;
      await context.models.likes.create({
        userId: args.userId,
        postId: args.postId
      });
    } else {
      post.isLiked = false;
      await context.models.likes.destroy({
        where: {
          id: like.id
        }
      });
    }
    return post;
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.addComment = async (args, context) => {
  try {
    return await context.models.comments.create({
      body: args.body,
      userId: args.userId,
      postId: args.postId
    });
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.deleteComment = async (args, context) => {
  try {
    const comment = await context.models.comments.findOne({
      where: {
        id: args.id
      }
    });

    if (context.payload.roleName === "Student_") {
      if (comment.userId !== context.payload.id) {
        throw new Error("Unauthorized");
      }
    }

    await comment.destroy();
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.changeFavorite = async (args, context) => {
  try {
    const post = await context.models.posts.findOne({
      where: {
        id: args.postId
      },
      include: [{
        model: context.models.postImages
      }]
    });

    const favorite = await context.models.favorites.findOne({
      where: {
        postId: args.postId,
        userId: args.userId
      }
    });

    if (!favorite) {
      post.isFavorite = true;
      await context.models.favorites.create({
        userId: args.userId,
        postId: args.postId
      });
    } else {
      post.isFavorite = false;
      await context.models.favorites.destroy({
        where: {
          id: favorite.id
        }
      });
    }

    return post;
  } catch (err) {
    throw new Error(err);
  }
}

// -------------------------------- //

exports.getSubjects = async (args ,context) => {
  try {
    return await context.models.subjects.findAll({
      where: {
        class: args.group ? args.group : {
          [context.models.Sequelize.Op.ne]: null
        },
        semester: args.semester ? args.semester : {
          [context.models.Sequelize.Op.ne]: null
        },
        type: args.type ? args.type : {
          [context.models.Sequelize.Op.ne]: null
        }
      }
    });
  }
  catch(err){
    throw new Error(err);
  }
};

// -------------------------------- //

exports.getGroupsOfUser = async (args ,context) => {
  try {
    const {id} = context.payload;

    const user = await context.models.users.findOne({
      where: {
        id: id
      },
      attributes: ["class"]
    });

    const allClasses = ["First" ,"Second" ,"Third" ,"Fourth" ,"Fifth"];

    const result = ["Special" ,"Public"];
    if( user.class !== null ){
      for(let Class of allClasses){
        result.push(Class);
        if( user.class === Class ){
          break;
        }
      }
    }

    return result;
  }
  catch(err){
    throw new Error(err);
  }
};

// -------------------------------- //
