const Controller = require('../controllers/Controller');

const resolvers = {
  Void: Controller.Helper.Void,
  Date: Controller.Helper.resolverMap,

  /// ------------------------- ///
  /// --------- Query --------- ///

  Query: {
    getMarksFiles: (root ,args ,context ,info) =>
      Controller.Marks.getMarksFiles(args ,context),

    getAllMarksFiles: (root ,args ,context ,info) =>
      Controller.Marks.getAllMarksFiles(args ,context),

    getUserMarks: (root ,args ,context ,info) =>
      Controller.Marks.getUserMarks(args ,context),

    getUniversityNumbers: (root ,args ,context ,info) =>
      Controller.Marks.getUniversityNumbers(args ,context)
  },

  /// ---------------------------- ///
  /// --------- Mutation --------- ///

  Mutation: {
    addMarksFile: (root ,args ,context ,info) =>
      Controller.Marks.addMarksFile(args ,context),

    deleteMarksFile: (root ,args ,context ,info) =>
      Controller.Marks.deleteMarksFile(args ,context),

    analyseMarksFile: (root ,args ,context ,info) =>
      Controller.Analyzer.analyseMarksFile(args ,context),
  },
};

module.exports = resolvers;
