exports.getPost = async (args, models) => {
    const post = await models.posts.findOne({
        where:{
            id: args.id
        }
    });
    const editedPost = JSON.parse(JSON.stringify(post));

    if( args.like == true){
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
    }

    if( args.comment == true ){
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
    }

    const user = await models.users.findOne({
        where:{
            id: post.userId
        }
    });

    editedPost.user = user;
    return editedPost;
}

exports.getPosts = async (args, models) => {

    if( args.filter == null){
        const allPost = await models.posts.findAll();

        const response = [];
        for( const post of allPost){
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
        return response;
    }
    else{
        const allFilterPost = await models.posts.findAll({
            where: {
                type: args.filter
            }
        });
        const response = [];
        for( const post of allFilterPost){
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
        return response;
    }
}

exports.addPost = async (args ,models) => {
    return await models.postRequests.create({
        subjectId: args.subjectId,
        type: args.type,
        title: args.title,
        body: args.body,
        userId: args.userId
    });
}

exports.deletePost = async (args ,models) =>{
    const post = await models.posts.findOne({
        where: {
            id: args.id
        }
    });

    const likes = await models.likes.findAll({
        where: {
            postId: args.id
        }
    });

    for( const like of likes ){
        await like.destroy();
    }

    const comments = await models.comments.findAll({
        where: {
            postId: args.id
        }
    });

    for( const comment of comments ){
        await comment.destroy();
    }
    const favorites = await models.favorites.findAll({
        where: {
            postId: args.id
        }
    });

    for( const favorite of favorites ){
        await favorite.destroy();
    }

    await post.destroy();
}

exports.getAllPostRequests = async (models) => {
    const postRequests = await models.postRequests.findAll();

    const response = [];
    for( const postRequest of postRequests ){
        const editedPostRequest = JSON.parse(JSON.stringify(postRequest));

        editedPostRequest.user = await models.users.findOne({
            where: {
                id: postRequest.userId
            }
        });

        response.push(editedPostRequest);
    }

    return response;
}

exports.approvalPostRequest = async (args ,models) => {
    if( args.cheack == true){
        const postRequest = await models.postRequests.findOne({
            where:{
                id: args.id
            }
        });

        await models.posts.create({
            subjectId: postRequest.subjectId,
            type: postRequest.type,
            title: postRequest.title,
            body: postRequest.body,
            userId: postRequest.userId
        })

        await postRequest.destroy();
    }

    else
    {
        const postRequest = await models.postRequests.findOne({
            where:{
                id: args.id
            }
        });

        await postRequest.destroy();
    }
}

exports.changeLike = async (args ,models) => {
    const like = await models.likes.findOne({
        where:{
            userId: args.userId,
            postId: args.postId
        }
    });

    if( like == null ){
        return await models.likes.create({
            userId: args.userId,
            postId: args.postId
        });
    }
    await like.destroy();
}

exports.addComment = async (args ,models) => {
    return await models.comments.create({
        body: args.body,
        userId: args.userId,
        postId: args.postId
    });
}

exports.deleteComment = async (args ,models) => {
    const comment = await models.comments.findOne({
        where: {
            id: args.id
        }
    });
    await comment.destroy();
}

exports.changeFavorite = async (args ,models) => {
    const favorite = await models.favorites.findOne({
        where:{
            userId: args.userId,
            postId: args.postId
        }
    });

    if( favorite == null ){
        return await models.favorites.create({
            userId: args.userId,
            postId: args.postId
        })
    }
    await favorite.destroy();
}


exports.getAllPostOfSubject = async (args ,models) => {
    const allPost = await models.posts.findAll({
        where: {
            subjectId: args.subjectId
        },
        order: [['createdAt', 'DESC']]
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

    return response;
}


