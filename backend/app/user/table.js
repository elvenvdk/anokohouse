const pool = require('../../databasePool');

class UserTable {
  static storeUser({ usernameHash, passwordHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO crm_user(username_hash, password_hash)
        VALUES ($1, $2)`,
        [usernameHash, passwordHash],
        (err, response) => {
          if (err) return reject(error);
          resolve();
        }
      );
    });
  }

  static getUser({ usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, password_hash, session_id
        FROM crm_user
        WHERE username_hash = $1`,
        [usernameHash],
        (err, response) => {
          if (err) return reject(err);
          resolve({ user: response.rows[0] });
        }
      );
    });
  }

  static updateSessionId({ sessionId, usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE crm_user
      SET session_id = $1
      WHERE username_hash = $2`,
        [sessionId, usernameHash],
        (err, response) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static deleteUser({ usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM crm_user
      WHERE username_hash = $1`,
        [usernameHash],
        (err, response) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }
}

module.exports = UserTable;
