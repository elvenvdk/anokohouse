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

  static updateTeamMember({ id, headShot, title, firstName, lastName, about }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE team SET
        head_shot =$1, 
        first_name = $2,
        last_name = $3, 
        title, about = $4
        WHERE id = $5`,
        [headShot, firstName, lastName, title, about, id],
        (err, response) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static createTeamMemberBucket({ headShot, firstName, lastName }) {
    return new Promise((resolve, reject) => {
      const Bucket = `anoko-team-headshots-` + uuid.v4();
      const Key = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${headShot}`;
      s3.createBucket({ Bucket }, () => {
        let data = {
          Bucket,
          Key,
          Body: headShot
        };
        s3.putObject(data, (err, data) => {
          if (err) return reject(err);
          console.log(data);
          resolve({ data, Bucket, Key });
        });
      });
    });
  }

  static createTeamMemberObject({ headShot, firstName, lastName }) {
    return new Promise((resolve, reject) => {
      const Bucket =
        'anoko-team-headshots-c0ea44fe-a6ec-4523-ba2f-5e3172d8d109';
      const Key = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${headShot}`;
      const bucketData = {
        Bucket,
        Key,
        Body: headShot
      };
      s3.putObject(bucketData, (err, data) => {
        if (err) return reject(err);
        resolve({ data, bucketData });
      });
    });
  }

  static getBuckets() {
    return new Promise((resolve, reject) => {
      s3.listBuckets((err, data) => {
        if (err) return reject(err.stack);
        console.log(data);
        resolve(data);
      });
    });
  }

  static getBucket({ bucketName, key }) {
    return new Promise((resolve, reject) => {
      const params = { bucketName, key };
      s3.listObjects(params, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  static getTeam() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM team`, (err, response) => {
        if (err) return reject(err);
        resolve(response.rows);
      });
    });
  }

  static getTeamMember({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM team WHERE member_id = $1`,
        [id],
        (err, response) => {
          if (err) return reject(err);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static deleteTeamMember({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM team
      WHERE member_id = $1`,
        [id],
        (err, response) => {
          if (err) return reject(err);
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
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = TeamTable;
