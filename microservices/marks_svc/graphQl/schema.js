const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  scalar Void
  
  type Query {

  }

  type Mutation {

  }
`;

module.exports = typeDefs;