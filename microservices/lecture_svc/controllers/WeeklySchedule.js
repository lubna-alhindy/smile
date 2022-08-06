const {unlinkSync} = require("fs");

/// ------------------------------------------ ///

exports.getWeeklySchedule = async (args ,context) => {
  try {
    return await context.models.weeklyschedules.findOne({
      where: {
        year: args.year
      }
    });
  }
  catch(err) {
    throw new Error(err);
  }
};

/// ------------------------------------------ ///

exports.deleteWeeklySchedule = async (args ,context) => {
  try {
    const weeklySchedule = await context.models.weeklyschedules.findOne({
      where: {
        id: args.id
      }
    });

    unlinkSync(weeklySchedule.url);
    await weeklySchedule.destroy();
  }
  catch(err) {
    throw new Error(err);
  }
};

/// ------------------------------------------ ///

exports.addWeeklySchedule = async (args ,context) => {
  try {
    return await context.models.weeklyschedules.create({
      url: args.url,
      year: args.year,
    });
  }
  catch(err) {
    throw new Error(err);
  }
};

/// ------------------------------------------ ///
