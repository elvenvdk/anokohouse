const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const uuid = require('uuid');

const routes = require('./api');

const app = express();

dotenv.config();

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', routes);

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const params = {
  Bucket: 'anoko-images'
};

// delete bucket
// s3.deleteBucket(params, (err, data) => {
//   if (err) console.log(err.stack);
//   console.log(data);
// });

// get bucket
s3.listObjects(params, (err, data) => {
  if (err) console.log(err.stack);
  console.log(data);
});

// create bucket
// const bucketName = 'alvinvanderkuech' + uuid.v4();
// s3.createBucket({ Bucket: bucketName }, () => {
//   let data = {
//     Bucket: bucketName,
//     Key: 'testFile.html',
//     Body: 'Testing fake image or something...'
//   };
//   s3.putObject(data, (err, data) => {
//     if (err) console.log('Error: ', err.stack);
//     console.log(data);
//   });
// });

// get buckets
// s3.listBuckets((err, data) => {
//   if (err) console.log('Error: ', err.stack);
//   console.log(data);
// });

module.exports = app;
