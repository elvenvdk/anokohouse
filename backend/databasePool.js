const pool = require('pg');
const dbConfig = require('./secrets/databaseConfig');

const pool = new pool(dbConfig);

module.exports = pool;
