const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Team = require('./team');

const router = Router();

router.use(bodyParser.json());
router.use(cookieParser());

// team
router.use('/team', Team);

module.exports = router;
