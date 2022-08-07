const {unlinkSync} = require("fs");

exports.getMarksFiles = async (args ,context) => {
    try{
      return await context,models.marksfiles({
        where: {
          id: args.id
        },
        include: context.models.subjects
      })
    } catch (err) {
      throw new Error();
    }
}

exports.getAllMarksFiles = async (args ,context) => {
    try {
      return await context.models.marksfiles.findAll({
        where: {
          year: args.year ? args.year : {
            [context.models.Sequelize.Op.ne]: null
          }
        },
        include: {
          model: context.models.subjects,
          where: {
            class: args.class ? args.class : {
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
}

exports.addMarksFile = async (args ,context) => {
  try {
    return await context.models.marksfiles.create({
      url: args.url,
      year: args.year,
      subjectId: args.subjectId
    });
  }
  catch(err) {
    throw new Error(err);
  }

}

exports.deleteMarksFile = async (args ,context) => {
  try {
    const marksFile = await context.models.marksfiles.findOne({
      where: {
        id: args.id
      }
    });

    unlinkSync(marksFile.url);
    await marksFile.destroy();
  }
  catch(err) {
    throw new Error(err);
  }

}