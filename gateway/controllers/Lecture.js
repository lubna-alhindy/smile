const {createWriteStream} = require('fs');
const {gql} = require('graphql-request');
const {join} = require('path');

const Connection = require('./Connection');
const Helper = require('./Helper');

/// --------------------------- ///

exports.addLecture = async (args ,context) => {
  let { createReadStream, filename, mimetype, encoding } = await args.file;
  const {year ,subjectId ,type} = await context.data.data;
  const stream = createReadStream();

  filename = Helper.uniqueName(filename) + '.' + mimetype.split('/')[1];
  const filePath = join(Helper.getUploadPath("lectures" ,"lecture_svc") ,filename);

  const out = createWriteStream(filePath);
  await stream.pipe(out);

  context.query = gql`mutation{addLecture(url:"${filename}",year:"${year}",subjectId:${subjectId},type:${type})}`;
  await Connection.fetch(context ,process.env.LECTURE_URL ,"addLecture");

  return {filename, mimetype, encoding };
};

/// --------------------------- ///