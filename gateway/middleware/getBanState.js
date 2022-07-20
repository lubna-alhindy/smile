const { request, gql } = require('graphql-request');

/// ----------------------------------------- ///

exports.getBanState = async id => {
  const query = gql`
    {
      getBanState(id: ${id})
    }
  `;

  const res = await request('http://localhost:3000/graphql', query);
  return res.getBanState;
};

/// ----------------------------------------- ///