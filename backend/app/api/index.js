const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Team = require('./team');
const User = require('./user');

const router = Router();

router.use(bodyParser.json());
router.use(cookieParser());

// team
router.use('/team', Team);
// user
router.use('/user', User);

module.exports = router;
