exports.getAllComplaints = async (models) => {
    const complaints =  await models.complaints.findAll();

    const response = [];
    for( const complaint of complaints){
        const editedComplaint = JSON.parse(JSON.stringify(complaint));
        editedComplaint.user = await models.users.findOne({
            where: {
                id: complaint.userId
            }
        });

        response.push(editedComplaint);
    }
    return response;
}

exports.addComplaint = async (args ,models) => {
    return await models.complaints.create({
        userId: args.userId,
        title: args.title,
        body: args.body
    });
}

exports.changeDoneComplaint = async (args ,models) => {
    const complaint = await models.complaints.findOne({
        where: {
            id: args.id
        }
    });

    if( args.choise == true ){
        complaint.isDone = true;
    }

    else {
        complaint.isDone = false;
    }

    await complaint.save();
    return complaint
}


exports.deleteComplaint = async (args ,models) => {
    const complaint = await models.complaints.findOne({
        where: {
            id: args.id
        }
    });

    await complaint.destroy();
}
