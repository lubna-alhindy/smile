const {Sequelize ,Op} = require('sequelize');
const Helper = require('./Helper');

// -------------------------------- //

exports.getPost = async (args, context) => {
    try {
        const post = await context.models.posts.findOne({
            where: {
                id: args.id
            },
            include: {
                model: context.models.postImages
            }
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
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.getPosts = async (args, context) => {
    try {
        const posts = await context.models.posts.findAll({
            where: {
                type: args.type !== undefined ? args.type : {
                    [Op.ne]: null
                },

                subjectId: args.subjectId !== undefined ? args.subjectId : {
                    [Op.or]:[{
                        [Op.ne]: null
                    }, {
                        [Op.eq]: null
                    }]
                }
            },

            include: [{
                model: context.models.postImages,
                attributes: ['name']
            },{
                model: context.models.users,
                attributes: ['firstName' ,'lastName' ,'image' ,'class']
            },{
                model: context.models.likes,
                attributes: ['id']
            },{
                model: context.models.comments,
                attributes: ['id']
            }]
        });

        for(let post of posts){
            post.likesCnt = post.likes.length;
            post.commentsCnt = post.comments.length;
        }

        return posts;
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.addPost = async (args ,context) => {
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
            if( !await Helper.writeImage(image, name) ){
                throw new Error("Ibternal server error, please try again");
            }

            post["postImages"].push(await context.models.postImages.create({
                name: name,
                postRequestId: post.id
            }));

            post["postImages"][i] = base64image;
        }

        return post;
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.subervisorAddPost = async (args ,context) => {
    try {
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
            if( !await Helper.writeImage(image, name) ){
                throw new Error("Ibternal server error, please try again");
            }

            post["postImages"].push(await context.models.postImages.create({
                name: name,
                postId: post.id
            }));

            post["postImages"][i] = base64image;
        }

        return post;
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.deletePost = async (args ,context) =>{
    try {
        const post = await context.models.posts.findOne({
            where: {
                id: args.id
            },
            include: {
                model: context.models.postImages
            }
        });

        if (post === null) {
            throw new Error("This Post is not found!");
        }

        if( context.payload.roleName === "USER" ){
            if( post.userId !== context.payload.id ){
                throw new Error("Unauthorized");
            }
        }

        for (let image of post.postImages) {
            await Helper.deleteImage(image.name);
        }

        await post.destroy();
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.getAllPostRequests = async (context) => {
    try {
        const postRequests = await context.models.postRequests.findAll({
            include: [{
                model: context.models.postImages
            }, {
                model: context.models.users
            }]
        });

        for(let i = 0 ; i < postRequests.length ; i++){
            for(let j = 0 ; j < postRequests[i].postImages.length ; j++){
                const imagePath = Helper.getImagePath(postRequests[i].postImages[j].name);
                postRequests[i].postImages[j].base64image = Helper.convertImageToBase64(imagePath);
            }
        }

        return postRequests;
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.approvalPostRequest = async (args ,context) => {
    try {
        const postRequest = await context.models.postRequests.findOne({
            where: {
                id: args.id
            },
            include: {
                model: context.models.postImages
            }
        });

        if (args.choice === true) {
            const post = await context.models.posts.create({
                subjectId: postRequest.subjectId,
                type: postRequest.type,
                title: postRequest.title,
                body: postRequest.body,
                userId: postRequest.userId
            });

            post["postImages"] = [];
            for (let image of postRequest.postImages) {
                post["postImages"].push(await context.models.postImages.update({
                    postRequestId: null,
                    postId: post.id
                }, {
                    where: {
                        id: image.id
                    }
                }));
                const imagePath = Helper.getImagePath(image.name);
                post["postImages"][post["postImages"].length - 1] = Helper.convertImageToBase64(imagePath);
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
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.changeLike = async (args ,context) => {
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
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.addComment = async (args ,context) => {
    try {
        return await context.models.comments.create({
            body: args.body,
            userId: args.userId,
            postId: args.postId
        });
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.deleteComment = async (args ,context) => {
    try {
        const comment = await context.models.comments.findOne({
            where: {
                id: args.id
            }
        });

        if( context.payload.roleName === "USER" ){
            if( comment.userId !== context.payload.id ){
                throw new Error("Unauthorized");
            }
        }

        await comment.destroy();
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.changeFavorite = async (args ,context) => {
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

        for (let i = 0; i < post.postImages; i++) {
            const imagePath = Helper.getImagePath(post.postImages[i].name);
            post.postImages[i].base64image = Helper.convertImageToBase64(imagePath);
        }

        if( !favorite ) {
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
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.getAllPostOfSubject = async (args ,context) => {
    try {
        const allPost = await context.models.posts.findAll({
            where: {
                subjectId: args.subjectId
            },
            order: [['createdAt', 'DESC']]
        });

        const response = [];
        for (const post of allPost) {
            const editedPost = JSON.parse(JSON.stringify(post));

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
            editedPost.user = await context.models.users.findOne({
                where: {
                    id: post.userId
                }
            });

            response.push(editedPost);
        }

        return response;
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //