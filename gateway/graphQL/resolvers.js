const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const {getBanState} = require("../middleware/getBanState");
const {checkToken} = require("../middleware/checkToken");
const {authorize} = require("../middleware/authorize");

/*
  Usage Example:
    const payload = await checkToken(context.token);
    const isBaned = await getBanState(payload.id);
    const auth = await authorize(payload.roleName ,"getUsers");
*/

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    hello: async (root ,args ,context) => {
      return "hello world!";
    }
  },

  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const out = require('fs').createWriteStream('local-file-output.jpg');
      await stream.pipe(out);
      return { filename, mimetype, encoding };
    }
  }
};

module.exports = resolvers;
