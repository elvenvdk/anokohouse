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

class ExperiencesTable {
  static createExperience({ image, title, videoUrl, about }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO experiences (
        image, title, video_url, about
      )
        VALUES ($1, $2, $3, $4)`,
        [image, title, videoUrl, about],
        (err, response) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static updateExperience({ id, image, title, videoUrl, about }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner SET
        image =$1, 
        title = $2,
        videoUrl = $3, 
        about = $4
        WHERE id = $5`,
        [image, title, videoUrl, about, id],
        (err, response) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static createExperienceBucket({ image, title }) {
    return new Promise((resolve, reject) => {
      const Bucket = `anoko-experiences-` + uuid.v4();
      const Key = `${title}_${image}`;
      s3.createBucket({ Bucket }, () => {
        let bucketData = {
          Bucket,
          Key,
          Body: image
        };
        s3.putObject(bucketData, (err, data) => {
          if (err) return reject(err);
          resolve({ data, bucketData });
        });
      });
    });
  }

  static createExperienceObject({ image, title }) {
    return new Promise((resolve, reject) => {
      const Bucket = 'anoko-experiences-dd9bb256-029e-49d1-aee8-c206c43b0e2f';
      const Key = `${title}_${image}`;
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
        resolve(data);
      });
    });
  }

  static getExperiences() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM experiences`, (err, response) => {
        if (err) return reject(err);
        resolve(response.rows);
      });
    });
  }

  static getExperience({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM experiences
      WHERE id = $1`,
        [id],
        (err, response) => {
          if (err) return reject(err);
          resolve(response.rows);
        }
      );
    });
  }

  static deleteExperience({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM experiences
      WHERE id = $1`,
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
        if (err) return reject(err);
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

module.exports = ExperiencesTable;
