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
  },

  Mutation: {
    addSummary: (root ,args ,context ,info) =>
      Controller.Summary.addSummary(args ,context),

    deleteSummary: (root ,args ,context ,info) =>
      Controller.Summary.deleteSummary(args ,context),
  }
};

module.exports = resolvers;
