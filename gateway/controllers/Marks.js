const {createWriteStream} = require('fs');
const {gql} = require('graphql-request');
const {join} = require('path');

const Connection = require('./Connection');
const Helper = require('./Helper');

/// --------------------------- ///

exports.addMarksFile = async (args ,context) => {
  let { createReadStream, filename, mimetype, encoding } = await args.file;

  const stream = createReadStream();
  filename = Helper.uniqueName(filename) + '.' + mimetype.split('/')[1];
  const filePath = join(Helper.getUploadPath("marksFiles" ,"marks_svc") ,filename);

  const out = createWriteStream(filePath);
  await stream.pipe(out);

  context.data = {
    ...context.data,
    ...context.data.data,
    url: filename
  }
  context.query = gql`mutation addMarksFile($url: String! ,$year: String! ,$subjectId: Int!){addMarksFile(url:$url,year:$year,subjectId:$subjectId){id}}`;
  const marksFile = await Connection.fetch(context ,process.env.MARKS_URL ,"addMarksFile");

  context.data.id = marksFile.id;
  context.query = gql`mutation analyseMarksFile($id: Int!){analyseMarksFile(id:$id)}`;
  Connection.fetch(context ,process.env.MARKS_URL ,"analyseMarksFile");

  return {filename, mimetype, encoding};
};

/// --------------------------- ///