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
        if (args.filter == null) {
            const allPost = await context.models.posts.findAll();

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
        } else {
            const allFilterPost = await context.models.posts.findAll({
                where: {
                    type: args.filter
                }
            });
            const response = [];
            for (const post of allFilterPost) {
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
            const name = Helper.uniqueName("posts" + "-" + post.id + "-" + i);

            const base64image = args.images[i].split(',')[1];

            const image = await Helper.convertBase64ToImage(base64image);

            await Helper.writeImage(image, name);

            post["postImages"].push(await context.models.postImages.create({
                name: name,
                postRequestId: post.id
            }));

            post["postImages"][post["postImages"].length - 1] = base64image;
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

        if (post == null) {
            throw new Error("This Post is not found!");
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

        const editedPostRequests = [];
        for (let post of postRequests) {
            const postImages = JSON.parse(JSON.stringify(post.postImages));
            for (let i = 0; i < post.postImages.length; i++) {
                postImages[i].base64Image = Helper.convertImageToBase64(post.postImages[i].name);
            }
            post.postImages = postImages;
            editedPostRequests.push(post);
        }

        return editedPostRequests;
    }
    catch(err){
        throw new Error(err);
    }
}

// -------------------------------- //

exports.approvalPostRequest = async (args ,context) => {
    try {
        let post = null;

        const postRequest = await context.models.postRequests.findOne({
            where: {
                id: args.id
            },
            include: {
                model: context.models.postImages
            }
        });

        if (args.choice === true) {
            post = await context.models.posts.create({
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
                const imageFile = Helper.readImage(image.name);
                post["postImages"][post["postImages"].length - 1] = Helper.convertImageToBase64(imageFile);
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
        return post;
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
            },
            include: {
                model: context.models.likes,
                where: {
                    userId: args.userId
                }
            }
        });

        if (!post.likes) {
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
        await context.models.comments.destroy({
            where: {
                id: args.id,
                userId: args.userId
            }
        });
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
                model: context.models.favorites,
                where: {
                    userId: args.userId
                }
            }, {
                model: context.models.postImages
            }]
        });

        for (let i = 0; i < post.postImages; i++) {
            const image = await Helper.readImage(post.postImages[i].name);
            post.postImages[i].base64Image = Helper.convertImageToBase64(image);
        }

        if (!post.favorite) {
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