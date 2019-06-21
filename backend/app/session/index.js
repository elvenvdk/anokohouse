const uuid = require('uuid/v4');
const { hash } = require('./helper');

const SEPERATOR = '|';

class Session {
  constructor({ username }) {
    this.username = username;
    this.id = uuid();
  }

  // parse session string
  static parse(sessionString) {
    const sessionData = sessionString.split(SEPERATOR);
    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2]
    };
  }

  // verify user session
  static verify(sessionString) {
    const { username, id, sessionHash } = Session.parse(sessionString);

    const userData = Session.userData({ username, id });

    return hash(userData) === sessionHash;
  }

  static sessionString({ username, id }) {
    const userData = Session.userData({ username, id });

    return `${userData}${SEPERATOR}${hash(userData)}`;
  }

  static userData({ username, id }) {
    return `${username}${SEPERATOR}${id}`;
  }

  toString() {
    const { username, id } = this;
    return Session.sessionString({ username, id });
  }
}

module.exports = Session;
