
exports.addNotification = async (userId,title,body,context) => {
    await context.models.notifications.create({
      userId: userId,
      title: title,
      body: body
    });
}

exports.getAllNotification = async (context) => {
  try {
    return await context.models.notifications.findAll({
      where: {
        [context.models.Sequeilze.Op.or]: [{
          userId: context.payload.id
        },{
          userId: null
        }]
      }
    })
  }
  catch (err) {
    throw new Error(err);
  }
}

exports.getNotification = async (args ,context) => {
  try {
    return await context.models.notifications.findOne({
      where: {
        id: args.id
      }
    })
  }
  catch (err) {
    throw new Error(err);
  }
}