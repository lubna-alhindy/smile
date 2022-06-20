exports.addComplaint = async (args ,models) => {
    return await models.complaints.create({
        UserId: args.UserId,
        title: args.title,
        body: args.body
    });
}

exports.deleteComplaint = async (args ,models) => {
    const complaint = await models.complaints.findOne({
        where: {
            id: args.id
        }
    });

    await complaint.destroy();

}

exports.makeComplaintAsDone = async (args ,models) => {
    const complaint = await models.complaints.findOne({
        where: {
            id: args.id
        }
    });

    complaint.isDone = true;

    await complaint.save();

    return complaint
}

exports.getAllComplaints = async (models) => {
    const complaints =  await models.complaints.findAll();

    const response = [];
    for( const complaint of complaints){
        const editedComplaint = JSON.parse(JSON.stringify(complaint));
        editedComplaint.user = await models.users.findOne({
            where: {
                id: complaint.UserId
            }
        });

        response.push(editedComplaint);
    }

    return response;
}