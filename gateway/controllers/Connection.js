const {request, gql} = require('graphql-request');

const {getAuthorization} = require('../middleware/Authorization');

/// -------------------------------------- ///

exports.fetch = async (context ,url ,resolverName) => {
  try {
    if( !(resolverName == "signup") &&  !(resolverName == "login") ) {
      if (!await getAuthorization(context.token, resolverName)) {
        throw new Error("Unauthorized");
      }
    }
    const res = await request(url, context.query[`${resolverName}`] ,{} ,{token: context.token});
    return res[`${resolverName}`];
  } catch (err) {
    throw new Error(err);
  }
}

/// -------------------------------------- ///