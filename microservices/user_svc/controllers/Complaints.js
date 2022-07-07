exports.getAllComplaints = async (context) => {
    const complaints =  await context.models.complaints.findAll();

    const response = [];
    for( const complaint of complaints){
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

exports.addComplaint = async (args ,context) => {
    return await context.models.complaints.create({
        userId: args.userId,
        title: args.title,
        body: args.body
    });
}

exports.changeDoneComplaint = async (args ,context) => {
    const complaint = await context.models.complaints.findOne({
        where: {
            id: args.id
        }
    });

    complaint.isDone = !complaint.isDone;
    await complaint.save();

    return complaint;
}

exports.deleteComplaint = async (args ,context) => {
    await context.models.complaints.destroy({
        where: {
            id: args.id
        }
    });
}
