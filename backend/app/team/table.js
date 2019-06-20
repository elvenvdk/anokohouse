const pool = require('../../databasePool.js');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const uuid = require('uuid');

dotenv.config();

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

class TeamTable {
  static createTeamMember({ headShot, title, firstName, lastName, about }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO team (
        head_shot, first_name, last_name, title, about
      )
        VALUES ($1, $2, $3, $4, $5)`,
        [headShot, firstName, lastName, title, about],
        (err, response) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static createTeamMemberBucket({ headShot, firstName, lastName }) {
    return new Promise((resolve, reject) => {
      const bucketName =
        `${firstName.toLowerCase()}-${lastName.toLowerCase()}-` + uuid.v4();
      const keyName = `${firstName}_${lastName}_${headShot}`;
      s3.createBucket({ Bucket: bucketName }, () => {
        let data = {
          Bucket: bucketName,
          Key: keyName,
          Body: headShot
        };
        s3.putObject(data, (err, data) => {
          if (err) reject(err);
          console.log(data);
          resolve({ data, bucketName, keyName });
        });
      });
    });
  }

  static getBuckets() {
    return new Promise((resolve, reject) => {
      s3.listBuckets((err, data) => {
        if (err) reject(err.stack);
        console.log(data);
        resolve(data);
      });
    });
  }

  static getTeam() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM team`, (err, response) => {
        if (err) reject(err);
        resolve(response.rows);
      });
    });
  }

  static deleteTeamMember({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM team
      WHERE member_id = $1`,
        [id],
        (err, response) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static deleteBucket({ bucket }) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: bucket };
      s3.deleteBucket(params, (err, data) => {
        if (err) console.log(err);
        resolve(data);
      });
    });
  }

  static deleteBucketObject({ bucket, key }) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: bucket, Key: key };
      s3.deleteObject(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = TeamTable;
