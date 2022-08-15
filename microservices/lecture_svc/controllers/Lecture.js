const {unlinkSync} = require("fs");

/// ------------------------------------- ///

exports.addLecture = async (args ,context) => {
  try {
    const subject = await context.models.subjects.findOne({
      where: {
        id: args.subjectId
      }
    });

    if( subject.class !== context.payload.roleName.split('_')[0] ){
      throw new Error("Unauthorized");
    }

    await context.models.lectures.create({
      url: args.url,
      year: args.year,
      subjectId: args.subjectId,
      type: args.type
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

/// ------------------------------------- ///

exports.deleteLecture = async (args ,context) => {
  try {
    const lecture = await context.models.lectures.findOne({
      where: {
        id: args.id
      },
      include: context.models.subjects,
      attribute: ["url"]
    });

    if( lecture.subject.class !== context.payload.roleName.split('_')[0] ){
      throw new Error("Unauthorized");
    }

    unlinkSync(lecture.url);
    await lecture.destroy();
  } catch (err) {
    throw new Error(err.message);
  }
};

/// ------------------------------------- ///

exports.getLecture = async (args ,context) => {
  try {
    return await context.models.lectures.findOne({
      where: {
        id: args.id
      },
      include: context.models.subjects
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

/// ------------------------------------- ///

exports.getAllLecture = async (args ,context) => {
  try {
    return await context.models.lectures.findAll({
      where: {
        type: args.lectureType ? args.lectureType : {
          [context.models.Sequelize.Op.ne]: null
        },
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
    throw new Error(err.message);
  }
};

/// ------------------------------------- ///