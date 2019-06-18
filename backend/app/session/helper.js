const SHA256 = require('crypto-js/sha256');

const hash = str =>
  SHA256(`${env.APP_SECRET}${str}${env.APP_SECRET}`).toString();

module.exports = { hash };
