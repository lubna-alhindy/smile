const {createWriteStream} = require('fs');
const {gql} = require('graphql-request');
const {join} = require('path');

const Connection = require('./Connection');
const Helper = require('./Helper');

/// --------------------------- ///

exports.addLecture = async (args ,context) => {
  let { createReadStream, filename, mimetype, encoding } = await args.file;
  const {year ,subjectId ,type} = await context.data;
  const stream = createReadStream();

  filename = Helper.uniqueName(filename) + '.' + mimetype.split('/')[1];
  const filePath = join(Helper.getUploadPath("lectures" ,"lecture_svc") ,filename);

  const out = createWriteStream(filePath);
  await stream.pipe(out);

  let path = "";
  for(let i = 0 ; i < filePath.length ; i++){
    if( i > 0 && filePath[i] === "\\" && filePath[i - 1] === "\\" ){
      continue;
    }
    if( filePath[i] === "\\" ){
      path += "/";
    } else {
      path += filePath[i];
    }
  }

  context.query["addLecture"] = gql`mutation{addLecture(url:"${path}",year:"${year}",subjectId:${subjectId},type:${type})}`;
  await Connection.fetch(context ,process.env.LECTURE_URL ,"addLecture");

  return {filename: path, mimetype, encoding };
};

/// --------------------------- ///