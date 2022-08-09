const {unlinkSync} = require("fs");

// ----------------------------- //

exports.getMarksFiles = async (args ,context) => {
    try{
      return await context.models.marksfiles({
        where: {
          id: args.id
        },
        include: context.models.subjects
      })
    } catch (err) {
      throw new Error(err);
    }
}

// ----------------------------- //

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

// ----------------------------- //

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

// ----------------------------- //

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

// ----------------------------- //

exports.getUniversityNumbers = async (args ,context) => {
  try {
    const response = [];
    for(let i = 0 ; i < args.years.length ; i++){
      const un = await context.models.universitynumbers.findOne({
        where: {
          year: args.years[i],
          universityNumber: args.universityNumbers[i]
        }
      });
      if( un !== null ) {
        response.push(un.id);
      }
    }

    return response;
  }
  catch(err) {
    throw new Error(err);
  }
}

// ----------------------------- //

exports.getUserMarks = async (args ,context) => {
  try {
    let marks = await context.models.subjectsuniversitynumbers.findAll({
      where: {
        universityNumberId: args.universityNumberIds
      },
      include:[{
        model: context.models.subjects,
        required: true,
        where: {
          class: args.class,
          type: args.type ? args.type : {
            [context.models.Sequelize.Op.ne]: null
          }
        }
      },{
        model: context.models.universitynumbers,
        as: "universityNumber"
      }]
    });

    const map = new Map();
    for(let i = 0 ; i < marks.length ; i++) {
      if( map[marks[i].subjectId] ){
        if( map[marks[i].subjectId].mark < marks[i].mark ){
          map[marks[i].subjectId] = marks[i];
        }
      } else {
        map[marks[i].subjectId] = marks[i];
      }
    }

    marks = [];
    for(const i in map){
      marks.push(map[i]);
    }

    let sum = 0.0 ,cnt = 0;
    for(let i=0; i< marks.length; i++) {
      if( marks[i].mark >= 60.0 && marks[i].subject.type === 'Theoretical' ){
        sum += marks[i].mark;
        cnt += 1;
      }
    }

    return {
      avg: !cnt ? 0.0 : sum / cnt,
      marks: marks
    };
  }
  catch(err) {
    throw new Error(err);
  }
}

// ----------------------------- //

exports.getSpecialSubjects = async (args ,context) => {
  try {
    const classes = ["First", "Second", "Third", "Fourth", "Fifth"];

    const neededClass = [];
    for(let i=0; i<classes.length; i++) {
      neededClass.push(classes[i]);
      if( classes[i] === args.class ){
        break;
      }
    }
    const subjects = await context.models.subjects.findAll({
      where: {
        class: neededClass
      }
    });

    const subjectIds = new Set();
    for(let i=0; i<subjects.length; i++) {
      subjectIds.add(subjects[i].id);
    }

    const result = await context.models.subjectsuniversitynumbers.findAll({
      where: {
        universityNumberId: args.universityNumbers,
        subjectId: Array.from(subjectIds),
        mark: {
          [context.models.Sequelize.Op.gte]: 60.0
        }
      }
    });

    const response = [];
    for(let i = 0 ; i < result.length ; i++) {
      subjectIds.delete(result[i].subjectId);
    }

    return Array.from(subjectIds);
  }
  catch(err) {
    throw new Error(err);
  }
};

// ----------------------------- //