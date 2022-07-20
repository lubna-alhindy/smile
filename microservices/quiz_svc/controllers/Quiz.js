/// -------------------------------- ///

exports.getQuizRequests = async (args ,context) => {
    try {
        return await context.models.quizRequests.findAll();
    }
    catch(err) {
        throw new Error(err);
    }
};

/// -------------------------------- ///

exports.getQuizs = async (args ,context) => {
    try {
        return await context.models.quizs.findAll({
            where: {
                subjectName: args.subjectName !== undefined ? args.subjectName : {
                    [context.models.Sequelize.Op.ne]: null
                }
            }
        });
    }
    catch(err) {
        throw new Error(err);
    }
};

/// -------------------------------- ///

exports.addQuiz = async (args ,context) => {
    try {
        return await context.models.quizRequests.create({
            subjectName: args.subjectName,
            question: args.question,
            answer: args.answer,
        });
    }
    catch(err) {
        throw new Error(err);
    }
};

/// -------------------------------- ///

exports.deleteQuiz = async (args ,context) => {
    try {
        await context.models.quizs.destroy({
            where: {
                id: args.id
            }
        });
    }
    catch(err) {
        throw new Error(err);
    }
};

/// -------------------------------- ///

exports.approvalQuizRequest = async (args ,context) => {
    try {
        const quizRequest = await context.models.quizRequests.findOne({
            where: {
                id: args.id
            }
        });

        if( !quizRequest ){
            throw new Error("The quiz not found");
        }

        if( args.choice === true ) {
            await context.models.quizs.create({
                subjectName: quizRequest.subjectName,
                question: quizRequest.question,
                answer: quizRequest.answer,
            });
        }

        await quizRequest.destroy();
    }
    catch(err) {
        throw new Error(err);
    }
};

/// -------------------------------- ///