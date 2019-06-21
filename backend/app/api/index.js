const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Team = require('./team');
const Partners = require('./partners');
const Members = require('./members');
const User = require('./user');
const Experiences = require('./experiences');

const router = Router();

router.use(bodyParser.json());
router.use(cookieParser());

// team
router.use('/team', Team);
// user
router.use('/user', User);
// partners
router.use('/partners', Partners);
// members
router.use('/members', Members);
// experiences
router.use('/experiences', Experiences);

module.exports = router;
