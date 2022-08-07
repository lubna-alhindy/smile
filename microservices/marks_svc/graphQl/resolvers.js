const Controller = require('../controllers/Controller');

const resolvers = {
  Void: Controller.Helper.Void,
  Date: Controller.Helper.resolverMap,

  /// ------------------------- ///
  /// --------- Query --------- ///

  Query: {

  },

  /// ---------------------------- ///
  /// --------- Mutation --------- ///

  Mutation: {


  },
};

module.exports = resolvers;
