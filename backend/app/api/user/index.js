const { Router } = require('express');
const UserTable = require('../../user/table');
const Session = require('../../session');
const { hash } = require('../../session/helper');
const { setSession, authenticatedUser } = require('./helper');

const router = Router();

// Signup
router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  UserTable.getUser({ usernameHash })
    .then(({ user }) => {
      if (!user) return UserTable.storeUser({ usernameHash, passwordHash });
      else {
        const error = new Error(
          'This username has already been taken.  Your username must be unique'
        );
        error.status = 400;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch(error => next(error));
});

// Login
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  UserTable.getUser({ usernameHash: hash(username) })
    .then(({ user }) => {
      if (user && user.password_hash === hash(password)) {
        const { session_id } = user;
        return setSession({ username, res, session_id });
      } else {
        const error = new Error('Incorrect username and/or password');
        error.statusCode = 409;
        throw error;
      }
    })
    .then(({ message }) => res.json(message))
    .catch(error => next(error));
});

// Logout
router.get('/logout', (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString);

  UserTable.updateSessionId({ sessionId: null, userNameHash: hash(username) })
    .then(() => {
      res.clearCookie('sessionString');
      res.json({ message: 'Successfully logged out' });
    })
    .catch(error => next(error));
});

// Authenticated
router.get('/authenticated', (req, res, next) => {
  const { sessionString } = req.cookies;

  authenticatedUser({ sessionString })
    .then(({ authenicated }) => res.json({ authenicated }))
    .catch(error => next(error));
});

module.exports = router;
