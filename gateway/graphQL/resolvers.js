const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    hello: async (args ,context) => {
      return "hello lolo!";
    },
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
