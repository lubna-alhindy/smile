exports.getAllPosts = async (models) => {
    const allPost = await models.posts.findAll();

    const response = [];
    for(const post of allPost){
        const editedPost = JSON.parse(JSON.stringify(post));

        const likes = await models.likes.findAll({
            where:{
                PostId: post.id
            }
        });

        const likesRes = [];
        for( const like of likes) {
            const editedLike = JSON.parse(JSON.stringify(like));
            editedLike.user = await models.users.findOne({
                where: {
                    id: like.UserId
                }
            });
            likesRes.push(editedLike);
        }
        editedPost.likes = likesRes;
        editedPost.likesCnt = editedPost.likes.length;

        const comments = await models.comments.findAll({
            where:{
                PostId: post.id
            }
        });

        const commentsRes = [];
        for( const comment of comments){
            const editedComment = JSON.parse(JSON.stringify(comment));
            editedComment.user = await models.users.findOne({
                where: {
                    id: comment.UserId
                }
            });
            commentsRes.push(editedComment);
        }
        editedPost.comments = commentsRes;
        editedPost.commentsCnt = editedPost.comments.length;

        const user = await models.users.findOne({
            where:{
                id: post.UserId
            }
        });

        editedPost.user = user;
        response.push(editedPost);
    }

    return response;
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
                PostId: post.id
            }
        });

        const likesRes = [];
        for( const like of likes) {
            const editedLike = JSON.parse(JSON.stringify(like));
            editedLike.user = await models.users.findOne({
                where: {
                    id: like.UserId
                }
            });
            likesRes.push(editedLike);
        }
        editedPost.likes = likesRes;
        editedPost.likesCnt = editedPost.likes.length;

        const comments = await models.comments.findAll({
            where:{
                PostId: post.id
            }
        });

        const commentsRes = [];
        for( const comment of comments){
            const editedComment = JSON.parse(JSON.stringify(comment));
            editedComment.user = await models.users.findOne({
                where: {
                    id: comment.UserId
                }
            });
            commentsRes.push(editedComment);
        }
        editedPost.comments = commentsRes;
        editedPost.commentsCnt = editedPost.comments.length;

        const user = await models.users.findOne({
            where:{
                id: post.UserId
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
            UserId: args.UserId
        }
    });

    const response = [];
    for(const post of allPost){
        const editedPost = JSON.parse(JSON.stringify(post));

        const likes = await models.likes.findAll({
            where:{
                PostId: post.id
            }
        });

        const likesRes = [];
        for( const like of likes) {
            const editedLike = JSON.parse(JSON.stringify(like));
            editedLike.user = await models.users.findOne({
                where: {
                    id: like.UserId
                }
            });
            likesRes.push(editedLike);
        }
        editedPost.likes = likesRes;
        editedPost.likesCnt = editedPost.likes.length;

        const comments = await models.comments.findAll({
            where:{
                PostId: post.id
            }
        });

        const commentsRes = [];
        for( const comment of comments){
            const editedComment = JSON.parse(JSON.stringify(comment));
            editedComment.user = await models.users.findOne({
                where: {
                    id: comment.UserId
                }
            });
            commentsRes.push(editedComment);
        }
        editedPost.comments = commentsRes;
        editedPost.commentsCnt = editedPost.comments.length;

        const user = await models.users.findOne({
            where:{
                id: post.UserId
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
                PostId: post.id
            }
        });

        const likesRes = [];
        for( const like of likes) {
            const editedLike = JSON.parse(JSON.stringify(like));
            editedLike.user = await models.users.findOne({
                where: {
                    id: like.UserId
                }
            });
            likesRes.push(editedLike);
        }
        editedPost.likes = likesRes;
        editedPost.likesCnt = editedPost.likes.length;

        const comments = await models.comments.findAll({
            where:{
                PostId: post.id
            }
        });

        const commentsRes = [];
        for( const comment of comments){
            const editedComment = JSON.parse(JSON.stringify(comment));
            editedComment.user = await models.users.findOne({
                where: {
                    id: comment.UserId
                }
            });
            commentsRes.push(editedComment);
        }
        editedPost.comments = commentsRes;
        editedPost.commentsCnt = editedPost.comments.length;

        const user = await models.users.findOne({
            where:{
                id: post.UserId
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
            UserId: args.UserId
        }
    });

    const favRes = [];
    for( const favorite of favorites){
        const editedFavorite = JSON.parse(JSON.stringify(favorite));

        editedFavorite.post = await models.posts.findOne({
            where: {
                id: favorite.PostId
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
        UserId: args.UserId
    });
}
exports.getAllPostRequests = async (models) => {
    const postRequests = await models.postRequests.findAll();

    const response = [];
    for( const postRequest of postRequests ){
        const editedPostRequest = JSON.parse(JSON.stringify(postRequest));

        editedPostRequest.user = await models.users.findOne({
            where: {
                id: postRequest.UserId
            }
        });

        response.push(editedPostRequest);
    }

    return response;
}

exports.acceptPostRequest = async (args ,models) => {
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
        UserId: postRequest.UserId
    })

    await postRequest.destroy();
}

exports.deletePostRequest = async (args ,models) => {
    const postRequest = await models.postRequests.findOne({
        where:{
            id: args.id
        }
    });

    await postRequest.destroy();
}

exports.like = async (args ,models) => {
    const like = await models.likes.findOne({
        where:{
            id: args.id
        }
    });

    if( like == null ){
        return await models.likes.create({
            UserId: args.UserId,
            PostId: args.PostId
        });
    }
    await like.destroy();
}

exports.addComment = async (args ,models) => {
    return await models.comments.create({
        body: args.body,
        UserId: args.UserId,
        PostId: args.PostId
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
        UserId: args.UserId,
        PostId: args.PostId
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
//             PostId: args.PostId
//         }
//     });
//
//     const commentsRes = [];
//     for( const comment of comments){
//         const editedComment = JSON.parse(JSON.stringify(comment));
//         editedComment.user = await models.users.findOne({
//             where: {
//                 id: comment.UserId
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
//             PostId: args.PostId
//         }
//     });
//
//     const likesRes = [];
//     for( const like of likes){
//         const editedLike = JSON.parse(JSON.stringify(like));
//         editedLike.user = await models.users.findOne({
//             where: {
//                 id: like.UserId
//             }
//         });
//         likesRes.push(editedLike);
//     }
//
//     return likesRes;
// }
