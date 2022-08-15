const pdf2table = require("pdf2table");
const {readFile} = require("fs");

// --------------------------------- //

exports.isNumber = str => {
  if( (typeof str) === "number" ) {
    return true;
  }
  return !isNaN(str);
};

// --------------------------------- //

exports.analyseMarksFile = async (args, context) => {
  try {
    const {id} = args;

    const marksFile = await context.models.marksfiles.findOne({
      where: {
        id: id
      },
      include: context.models.subjects
    });

    readFile(marksFile.url, (err ,buffer) => {
      if (err) {
        throw new Error(err.message);
      }

      pdf2table.parse(buffer ,async (err, rows, rowsdebug) => {
        const n = rows.length;
        const lowerbound = 100000;

        for(let i = 0; i < n; i++) {
          if (this.isNumber(rows[i][rows[i].length - 1])) {
            if ( parseInt(rows[i][rows[i].length - 1]) >= 10000 ) {
              const [student] = await context.models.universitynumbers.findOrCreate({
                where: {
                  universityNumber: parseInt(rows[i][rows[i].length - 1]),
                  year: marksFile.year
                }
              });

              let mark = 0;
              for (let j = 0; j < rows[i].length; j++) {
                if (this.isNumber(rows[i][j])) {
                  if (parseInt(rows[i][j]) !== student.universityNumber) {
                    mark = parseInt(rows[i][j]);
                  }
                  break;
                }
              }

              await context.models.subjectsuniversitynumbers.create({
                mark: mark,
                subjectId: marksFile.subjectId,
                universityNumberId: student.id
              });
            }
          }
        }
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

// --------------------------------- //

