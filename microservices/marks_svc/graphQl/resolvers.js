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
  },

  /// ---------------------------- ///
  /// --------- Mutation --------- ///

  Mutation: {
    addMarksFile: (root ,args ,context ,info) =>
      Controller.Marks.addMarksFile(args ,context),

    deleteMarksFile: (root ,args ,context ,info) =>
      Controller.Marks.deleteMarksFile(args ,context),

  },
};

module.exports = resolvers;
