const {createWriteStream} = require('fs');
const {gql} = require('graphql-request');
const {join} = require('path');

const Connection = require('./Connection');
const Helper = require('./Helper');

/// --------------------------- ///

exports.addWeeklySchedule = async (args ,context) => {
  let { createReadStream, filename, mimetype, encoding } = await args.file;
  const {year} = await context.data;
  const stream = createReadStream();

  filename = Helper.uniqueName(filename) + '.' + mimetype.split('/')[1];
  const filePath = join(Helper.getUploadPath("weeklySchedules" ,"lecture_svc") ,filename);

  const out = createWriteStream(filePath);
  await stream.pipe(out);

  context.query["addWeeklySchedule"] = gql`mutation{addWeeklySchedule(url:"${filename}",year:"${year}")}`;
  await Connection.fetch(context ,process.env.LECTURE_URL ,"addWeeklySchedule");

  return {filename: filename, mimetype, encoding };
};

/// --------------------------- ///