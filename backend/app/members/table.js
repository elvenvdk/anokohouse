const pool = require('../../databasePool');
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

class MembersTable {
  static createMember({ headShot, title, firstName, lastName, about }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO intro_members (
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

  static updateMember({ id, headShot, title, firstName, lastName, about }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE intro_members SET
        head_shot =$1, 
        first_name = $2,
        last_name = $3, 
        title = $4, 
        about = $5
        WHERE id = $6`,
        [headShot, firstName, lastName, title, about, id],
        (err, response) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static createMemberBucket({ headShot, firstName, lastName }) {
    return new Promise((resolve, reject) => {
      const Bucket = `anoko-members-` + uuid.v4();
      const Key = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${headShot}`;
      s3.createBucket({ Bucket }, () => {
        let bucketData = {
          Bucket,
          Key,
          Body: headShot
        };
        s3.putObject(bucketData, (err, data) => {
          if (err) return reject(err);
          resolve({ data, bucketData });
        });
      });
    });
  }

  static createMemberObject({ headShot, firstName, lastName }) {
    return new Promise((resolve, reject) => {
      const Bucket = 'anoko-members-39061a53-ff5f-4394-a446-bdd9784d2000';
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

  static getMembers() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM intro_members`, (err, response) => {
        if (err) return reject(err);
        resolve(response.rows);
      });
    });
  }

  static getMember({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM intro_members
      WHERE id = $1`,
        [id],
        (err, response) => {
          if (err) return reject(err);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static deleteMember({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM intro_members
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

module.exports = MembersTable;
