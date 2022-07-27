const {request, gql} = require('graphql-request');

const {getAuthorization} = require('../middleware/Authorization');

/// -------------------------------------- ///

exports.fetch = async (context ,url ,resolverName) => {
  try {
    if (!await getAuthorization(context.token, resolverName)) {
      throw new Error("Unauthorized");
    }
    const res = await request(url, context.query[`${resolverName}`]);
    return res[`${resolverName}`];
  } catch (err) {
    throw new Error(err);
  }
}

/// -------------------------------------- ///