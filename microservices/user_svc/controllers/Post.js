exports.getPost = async (args, models) => {
    const post = await models.posts.findByPk(args.id);
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

    return editedPost;
}


exports.getAllGeneralPost = async (models) => {
    const allPost = await models.posts.findAll({
        where: {
            subjectId: null
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

    return response;
}

exports.getAllPostOfUser = async (args ,models) => {
    const allPost = await models.posts.findAll({
        where:{
            userId: args.userId
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

    return response;
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

exports.getFavoritePosts = async (args ,models) => {
    const favorites = await models.favorites.findAll({
        where: {
            userId: args.userId
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

    return favRes;
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


exports.like = async (args ,models) => {
    const like = await models.likes.findOne({
        where:{
            id: args.id
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

exports.addFavorite = async (args ,models) => {
    return await models.favorites.create({
        userId: args.userId,
        postId: args.postId
    })
}

exports.deleteFavorite = async (args ,models) => {
    const favorite = await models.favorites.findOne({
        where:{
            id: args.id
        }
    });
    await favorite.destroy();
}
//
// exports.getComments = async (args) => {
//     const comments = await models.comments.findAll({
//         where: {
//             postId: args.postId
//         }
//     });
//
//     const commentsRes = [];
//     for( const comment of comments){
//         const editedComment = JSON.parse(JSON.stringify(comment));
//         editedComment.user = await models.users.findOne({
//             where: {
//                 id: comment.userId
//             }
//         });
//         commentsRes.push(editedComment);
//     }
//
//     return commentsRes;
// }
//
// exports.getLikes = async (args) => {
//     const likes = await models.likes.findAll({
//         where: {
//             postId: args.postId
//         }
//     });
//
//     const likesRes = [];
//     for( const like of likes){
//         const editedLike = JSON.parse(JSON.stringify(like));
//         editedLike.user = await models.users.findOne({
//             where: {
//                 id: like.userId
//             }
//         });
//         likesRes.push(editedLike);
//     }
//
//     return likesRes;
// }
