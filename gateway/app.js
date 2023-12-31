const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const {ApolloServer} = require('apollo-server-express');
const {request, gql} = require('graphql-request');
const schedule = require('node-schedule');
const express = require('express');
const path = require('path');
require("dotenv").config();

const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const {getBody} = require('./graphQL/body');

/// -------------------------------------------- ///

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: async ({req}) => {
      console.log("HEADERS:");
      console.log(req.headers);
      console.log("BODY:");
      console.log(req.body);
      console.log("==========================================");

      return {
        token: !req.get('Authorization') ? null : (!req.get('Authorization').split(' ')[1] ? null : req.get('Authorization').split(' ')[1]),
        query: req.body.query,
        data: !req.body ? undefined : (
          !req.body.variables ? undefined :
              req.body.variables
        )
      };
    },

    introspection: true,
    playground: true
  });

  await server.start();
  const app = express();

  app.use(graphqlUploadExpress());
  app.use("/images" ,express.static(path.join(__dirname, "..", "microservices", "user_svc", "assets", "images")));
  app.use("/lecture_svc/files" ,express.static(path.join(__dirname, "..", "microservices", "lecture_svc", "upload", "lectures")));
  app.use("/lecture_svc/weeklySchedules" ,express.static(path.join(__dirname, "..", "microservices", "lecture_svc", "upload", "weeklySchedules")));
  app.use("/marks_svc/files" ,express.static(path.join(__dirname, "..", "microservices", "marks_svc", "upload", "marksFiles")));

  schedule.scheduleJob('2 0 0 * * *', () => {
    request(process.env.USER_URL, gql`
    mutation {
      adsDeleter
    }
  `);
  });

  server.applyMiddleware({
    app,
    cors: {
      origin: true,
      credentials: true,
    },
    bodyParserConfig: {
      limit:"50mb"
    }
  });

  app.listen(process.env.PORT, result => {
    console.log(`🚀 Gateway Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  });
}

/// -------------------------------------------- ///

startServer()
  .then()
  .catch(err => {
    console.error(err);
  });

/// -------------------------------------------- ///