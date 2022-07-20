const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const {request, gql} = require('graphql-request');

const {getAuthorization} = require("../middleware/Authorization");
const Helper = require("../controllers/Helper");

const resolvers = {
  Void: Helper.Void,
  Upload: GraphQLUpload,
  Date: Helper.resolverMap,

  Query: {
    getQuizRequests: async (root ,args ,context) => {
      if( ! await getAuthorization(context.token ,"getQuizRequests") ){
        throw new Error("Unauthorized");
      }

      const query = gql`
        {
          getQuizRequests{
            id
            subjectName
            question
            answer
            createdAt
            updatedAt
          }
        }
      `;

      const res = await request('http://localhost:6000', query);
      return res.getQuizRequests;
    },

    getQuizs: async (root ,args ,context) => {
      if( ! await getAuthorization(context.token ,"getQuizs") ){
        throw new Error("Unauthorized");
      }

      const getQuiz = "getQuizs" + (args.subjectName === undefined ? "{" : `(subjectName: "${args.subjectName}"){`);

      const query = gql`
        {
          ${getQuiz}
            id
            subjectName
            question
            answer
            createdAt
            updatedAt
          }
        }
      `;

      const res = await request('http://localhost:6000', query);
      return res.getQuizs;
    },
  },

  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const out = require('fs').createWriteStream('local-file-output.jpg');
      await stream.pipe(out);
      return { filename, mimetype, encoding };
    },

    addQuiz: async (root ,args ,context) => {
      if( ! await getAuthorization(context.token ,"addQuiz") ){
        throw new Error("Unauthorized");
      }

      const query = gql`
        mutation{
          addQuiz(subjectName: "${args.subjectName}" ,question: "${args.question}" ,answer: "${args.answer}"){
            id
            subjectName
            question
            answer
            createdAt
            updatedAt
          }
        }
      `;

      const res = await request('http://localhost:6000', query);
      return res.addQuiz;
    },

    deleteQuiz: async (root ,args ,context) => {
      if( ! await getAuthorization(context.token ,"deleteQuiz") ){
        throw new Error("Unauthorized");
      }

      const query = gql`
        mutation{
          deleteQuiz(id: ${args.id})
        }
      `;

      const res = await request('http://localhost:6000', query);
      return res.deleteQuiz;
    },

    approvalQuizRequest: async (root ,args ,context) => {
      if( ! await getAuthorization(context.token ,"approvalQuizRequest") ){
        throw new Error("Unauthorized");
      }

      const query = gql`
        mutation{
          approvalQuizRequest(id: ${args.id} ,choice: ${args.choice})
        }
      `;

      const res = await request('http://localhost:6000', query);
      return res.approvalQuizRequest;
    },
  }
};

module.exports = resolvers;
