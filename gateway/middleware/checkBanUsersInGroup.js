const { request, gql } = require('graphql-request');

/// ----------------------------------------- ///

exports.getBanState = async (userId ,groupId) => {
  const query = gql`
    {
      checkBanUsersInGroup(userId: ${userId}, groupId: ${groupId})
    }
  `;

  const res = await request('http://localhost:3000/graphql', query);
  return res.getBanState;
};

/// ----------------------------------------- ///