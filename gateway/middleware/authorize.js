const { request, gql } = require('graphql-request');

/// ----------------------------------------- ///

exports.authorize = async (roleName ,permissionName) => {
  const query = gql`
    {
      authorize(roleName: ${roleName} ,permissionName: "${permissionName}")
    }
  `;

  const res = await request('http://localhost:5000', query);
  return res.authorize;
};

/// ----------------------------------------- ///