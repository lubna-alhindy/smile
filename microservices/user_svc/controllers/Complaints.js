// --------------------------------------- //

exports.getAllComplaints = async (context) => {
    try {
        const complaints = await context.models.complaints.findAll();

        const response = [];
        for (const complaint of complaints) {
            const editedComplaint = JSON.parse(JSON.stringify(complaint));
            editedComplaint.user = await context.models.users.findOne({
                where: {
                    id: complaint.userId
                }
            });

            response.push(editedComplaint);
        }
        return response;
    }
    catch(err){
        throw new Error(err);
    }
}

// --------------------------------------- //

exports.addComplaint = async (args ,context) => {
    try {
        return await context.models.complaints.create({
            userId: args.userId,
            title: args.title,
            body: args.body
        });
    }
    catch(err){
        throw new Error(err);
    }
}

// --------------------------------------- //

exports.changeDoneComplaint = async (args ,context) => {
    try {
        const complaint = await context.models.complaints.findOne({
            where: {
                id: args.id
            }
        });

        complaint.isDone = !complaint.isDone;
        await complaint.save();

        return complaint;
    }
    catch(err){
        throw new Error(err);
    }
}

// --------------------------------------- //

exports.deleteComplaint = async (args ,context) => {
    try {
        await context.models.complaints.destroy({
            where: {
                id: args.id
            }
        });
    }
    catch(err){
        throw new Error(err);
    }
}

// --------------------------------------- //