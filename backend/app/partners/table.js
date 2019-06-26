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

class PartnersTable {
  static createPartner({ image, title, about, tags }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO partners (
          image, title, about, tags
      )
        VALUES ($1, $2, $3, $4)`,
        [image, title, about, tags],
        (err, response) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static updatePartner({ id, image, title, about, tags }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner SET
        image =$1, 
        title = $2,
        about = $3, 
        tags = $4
        WHERE id = $5`,
        [image, title, about, tags, id],
        (err, response) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static createPartnerBucket({ image, title }) {
    return new Promise((resolve, reject) => {
      const Bucket = `anoko-partner-images-` + uuid.v4();
      const Key = `${title}_${image}`;
      s3.createBucket({ Bucket }, () => {
        let bucketData = {
          Bucket,
          Key,
          Body: image
        };
        s3.putObject(bucketData, (err, data) => {
          if (err) reject(err);
          resolve({ data, bucketData });
        });
      });
    });
  }

  static createPartnerObject({ headShot, title }) {
    return new Promise((resolve, reject) => {
      const Bucket = `anoko-partner-images-` + uuid.v4();
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
        if (err) reject(err.stack);
        console.log(data);
        resolve(data);
      });
    });
  }

  static getPartners() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM partners`, (err, response) => {
        if (err) reject(err);
        resolve(response.rows);
      });
    });
  }

  static getPartner({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM partners
      WHERE partner_id = $1`,
        [id],
        (err, response) => {
          if (err) return reject(err);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static deletePartner({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM partners
          WHERE partner_id = $1`,
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

module.exports = PartnersTable;
