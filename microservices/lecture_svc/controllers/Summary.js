exports.getSummary = async (args, context) => {
  try {
    return await context.models.summarys.findOne({
      where: {
        id: args.id
      },
      include: {
        model: context.models.subjects,
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.getAllSummary = async (args, context) => {
  try {
    return await context.models.summarys.findAll({
      include: {
        model: context.models.subjects,
        where: {
          class: args.group ? args.group : {
            [context.models.Sequelize.Op.ne]: null
          },
          semester: args.semester ? args.semester : {
            [context.models.Sequelize.Op.ne]: null
          },
          type: args.type ? args.type : {
            [context.models.Sequelize.Op.ne]: null
          }
        }
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.addSummary = async (args, context) => {
  try {
    return await context.models.summarys.create({
      subjectId: args.subjectId,
      title: args.title,
      body: args.body
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteSummary = async (args, context) => {
  try {
    await context.models.summarys.destroy({
      where: {
        id: args.id
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

