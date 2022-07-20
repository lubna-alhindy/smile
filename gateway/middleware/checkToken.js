const { request, gql } = require('graphql-request');

/// ----------------------------------------- ///

exports.checkToken = async token => {
  const query = gql`
    {
      checkToken(token: "${token}") {
        id
        email
        roleName
      }
    }
  `;

  const res = await request('http://localhost:3000/graphql', query);

  return res.checkToken;
};

/// ----------------------------------------- ///