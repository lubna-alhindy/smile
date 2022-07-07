const Healper = require('./Helper');
const {Helper} = require("./Controller");

exports.getPost = async (args, context) => {
    const post = await context.models.posts.findOne({
        where:{
            id: args.id
        },
        include: {
            model: context.models.postImages
        }
    });
    const editedPost = JSON.parse(JSON.stringify(post));

    if( args.like == true){
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
    }

    if( args.comment == true ){
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
    }

    const user = await context.models.users.findOne({
        where:{
            id: post.userId
        }
    });

    editedPost.user = user;
    return editedPost;
}

exports.getPosts = async (args, context) => {
    if( args.filter == null){
        const allPost = await context.models.posts.findAll();

        const response = [];
        for( const post of allPost){
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
        return response;
    }
    else{
        const allFilterPost = await context.models.posts.findAll({
            where: {
                type: args.filter
            }
        });
        const response = [];
        for( const post of allFilterPost){
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
        return response;
    }
}

exports.addPost = async (args ,context) => {
    const post = await context.models.postRequests.create({
        subjectId: args.subjectId,
        userId: args.userId,
        title: args.title,
        type: args.type,
        body: args.body
    });

    post["postImages"] = [];
    for(let i = 0 ; i < args.images.length ; i++){
        const name = Helper.uniqueName("posts" + "-" + post.id  + "-" + i);

        const base64image = args.images[i].split(',')[1];

        const image = await Helper.convertBase64ToImage(base64image);

        await Helper.writeImage(image ,name);

        post["postImages"].push( await context.models.postImages.create({
            name: name,
            postRequestId: post.id
        }));

        post["postImages"][post["postImages"].length - 1] = base64image;
    }

    return post;
}

exports.deletePost = async (args ,context) =>{
    const post = await context.models.posts.findOne({
        where: {
            id: args.id
        },
        include: {
            model: context.models.postImages
        }
    });

    if( post == null ){
        throw new Error("This Post is not found!");
    }

    for(let image of post.postImages){
        await Helper.deleteImage(image.name);
    }

    await post.destroy();
}

exports.getAllPostRequests = async (context) => {
    const postRequests = await context.models.postRequests.findAll();

    const response = [];
    for( const postRequest of postRequests ){
        const editedPostRequest = JSON.parse(JSON.stringify(postRequest));

        editedPostRequest.user = await context.models.users.findOne({
            where: {
                id: postRequest.userId
            }
        });

        response.push(editedPostRequest);
    }

    return response;
}

exports.approvalPostRequest = async (args ,context) => {
    let post = null;

    const postRequest = await context.models.postRequests.findOne({
        where:{
            id: args.id
        },
        include: {
            model: context.models.postImages
        }
    });

    if( args.choice === true ){
        post = await context.models.posts.create({
            subjectId: postRequest.subjectId,
            type: postRequest.type,
            title: postRequest.title,
            body: postRequest.body,
            userId: postRequest.userId
        });

        post["postImages"] = [];
        for(let image of postRequest.postImages) {
            post["postImages"].push(await context.models.postImages.update({
               postRequestId: null,
               postId: post.id
            },{
                where: {
                    id: image.id
                }
            }));
            const imageFile = Helper.readImage(image.name);
            post["postImages"][post["postImages"].length - 1] = Helper.convertImageToBase64(imageFile);
        }
    }
    else
    {
        for(let image of postRequest.postImages){
            await Helper.deleteImage(image.name);
            await context.models.postImages.destroy({
                where: {
                    id: image.id
                }
            });
        }
    }

    await postRequest.destroy();
    return post;
}

exports.changeLike = async (args ,context) => {
    const post = await context.models.posts.findOne({
        where:{
            id: args.postId
        },
        include: {
            model: context.models.likes,
            where: {
                userId: args.userId
            }
        }
    });

    if( !post.likes ){
        post.isLiked = true;
        await context.models.likes.create({
            userId: args.userId,
            postId: args.postId
        });
    } else {
        post.isLiked = false;
        await context.models.likes.destroy({
            where: {
                id: post.like.id
            }
        });
    }

    return post;
}

exports.addComment = async (args ,context) => {
    return await context.models.comments.create({
        body: args.body,
        userId: args.userId,
        postId: args.postId
    });
}

exports.deleteComment = async (args ,context) => {
    await context.models.comments.destroy({
        where: {
            id: args.id,
            userId: args.userId
        }
    });
}

exports.changeFavorite = async (args ,context) => {
    const post = await context.models.posts.findOne({
        where:{
            id: args.postId
        },
        include: [{
            model: context.models.favorites,
            where: {
                userId: args.userId
            }
        },{
            model: context.models.postImages
        }]
    });

    for(let i = 0 ; i < post.postImages ; i++){
        const image = await Helper.readImage(post.postImages[i].name);
        post.postImages[i].base64Image = Helper.convertImageToBase64(image);
    }

    if( !post.favorite ){
        post.isFavorite = true;
        await context.models.favorites.create({
            userId: args.userId,
            postId: args.postId
        });
    } else {
        post.isFavorite = false;
        await context.models.favorites.destroy({
            where: {
                id: post.favorite.id
            }
        });
    }

    return post;
}


exports.getAllPostOfSubject = async (args ,context) => {
    const allPost = await context.models.posts.findAll({
        where: {
            subjectId: args.subjectId
        },
        order: [['createdAt', 'DESC']]
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

    return response;
}


