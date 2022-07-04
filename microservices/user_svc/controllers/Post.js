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
    return await context.models.postRequests.create({
        subjectId: args.subjectId,
        userId: args.userId,
        title: args.title,
        type: args.type,
        body: args.body
    });
}

exports.deletePost = async (args ,context) =>{
    const post = await context.models.posts.findOne({
        where: {
            id: args.id
        }
    });

    if( post == null ){
        throw new Error("This Post is not found!");
    }

    const likes = await context.models.likes.findAll({
        where: {
            postId: args.id
        }
    });

    for( const like of likes ){
        await like.destroy();
    }

    const comments = await context.models.comments.findAll({
        where: {
            postId: args.id
        }
    });

    for( const comment of comments ){
        await comment.destroy();
    }
    const favorites = await context.models.favorites.findAll({
        where: {
            postId: args.id
        }
    });

    for( const favorite of favorites ){
        await favorite.destroy();
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
    if( args.cheack == true){
        const postRequest = await context.models.postRequests.findOne({
            where:{
                id: args.id
            }
        });

        await context.models.posts.create({
            subjectId: postRequest.subjectId,
            type: postRequest.type,
            title: postRequest.title,
            body: postRequest.body,
            userId: postRequest.userId
        })

        const post = postRequest;
        await postRequest.destroy();

        return post;
    }

    else
    {
        const postRequest = await context.models.postRequests.findOne({
            where:{
                id: args.id
            },
            include: {
                model: context.models.postImages
            }
        });

        for(let image of postRequest.postImages){
            await context.models.postImages.destroy({
                where: {
                    id: image.id
                }
            });
        }

        await postRequest.destroy();
    }
}

exports.changeLike = async (args ,context) => {
    const like = await context.models.likes.findOne({
        where:{
            userId: args.userId,
            postId: args.postId
        }
    });

    if( like == null ){
        return await context.models.likes.create({
            userId: args.userId,
            postId: args.postId
        });
    }
    await like.destroy();
}

exports.addComment = async (args ,context) => {
    return await context.models.comments.create({
        body: args.body,
        userId: args.userId,
        postId: args.postId
    });
}

exports.deleteComment = async (args ,context) => {
    const comment = await context.models.comments.findOne({
        where: {
            id: args.id,
            userId: args.userId
        }
    });
    await comment.destroy();
}

exports.changeFavorite = async (args ,context) => {
    const favorite = await context.models.favorites.findOne({
        where:{
            userId: args.userId,
            postId: args.postId
        }
    });

    if( favorite == null ){
        return await context.models.favorites.create({
            userId: args.userId,
            postId: args.postId
        })
    }
    await favorite.destroy();
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


