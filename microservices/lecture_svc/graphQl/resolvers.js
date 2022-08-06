const Controller = require('../controllers/Controller');

const resolvers = {
  Void: Controller.Helper.Void,
  Date: Controller.Helper.resolverMap,

  /// ------------------------- ///
  /// --------- Query --------- ///

  Query: {
    getSummary: (root ,args ,context ,info) =>
      Controller.Summary.getSummary(args ,context),

    getAllSummary: (root ,args ,context ,info) =>
      Controller.Summary.getAllSummary(args ,context),

    getLecture: (root ,args ,context ,info) =>
      Controller.Lecture.getLecture(args ,context),

    getAllLecture: (root ,args ,context ,info) =>
      Controller.Lecture.getAllLecture(args ,context),

    getWeeklySchedule: (root ,args ,context ,info) =>
      Controller.WeeklySchedule.getWeeklySchedule(args ,context),
  },

  Mutation: {
    addSummary: (root ,args ,context ,info) =>
      Controller.Summary.addSummary(args ,context),

    deleteSummary: (root ,args ,context ,info) =>
      Controller.Summary.deleteSummary(args ,context),

    addLecture: (root ,args ,context ,info) =>
      Controller.Lecture.addLecture(args ,context),

    deleteLecture: (root ,args ,context ,info) =>
      Controller.Lecture.deleteLecture(args ,context),

    deleteWeeklySchedule: (root ,args ,context ,info) =>
      Controller.WeeklySchedule.deleteWeeklySchedule(args ,context),

    addWeeklySchedule: (root ,args ,context ,info) =>
      Controller.WeeklySchedule.addWeeklySchedule(args ,context),
  }
};

module.exports = resolvers;
