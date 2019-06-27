const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const uuid = require('uuid');

const routes = require('./api');
const { errHandler } = require('./helper');

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();
app.use('/', routes);

app.use(errHandler);

// AWS.config.update({
//   region: 'us-east-1',
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// const s3 = new AWS.S3();

// const params = {
//   Bucket: 'alvinvanderkuech72abe181-3ec8-4d2a-aa70-b598efd61404',
//   Key: 'testFile.html'
// };

// delete bucket;
// s3.deleteBucket(params, (err, data) => {
//   if (err) console.log(err.stack);
//   console.log(data);
// });

// delete object in bucket
// s3.deleteObject(params, (err, data) => {
//   if (err) console.log(err.stack);
//   console.log(data);
// });

// get bucket
// s3.listObjects(params, (err, data) => {
//   if (err) console.log(err.stack);
//   console.log(data);
// });

// create bucket
// const bucketName = 'test-bucket' + uuid.v4();
// s3.createBucket({ Bucket: bucketName }, () => {
//   let data = {
//     Bucket: bucketName,
//     Key: 'testFile.jpeg',
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
