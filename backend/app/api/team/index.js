const { Router } = require('express');
const TeamTable = require('../../team/table');
const uuid = require('uuid');
const AWS = require('aws-sdk');

const router = Router();
const s3 = new AWS.S3();
// router.post('/create', (req, res, next) => {
//   const { headShot, title, firstName, lastName, about } = req.body;
//   TeamTable.createTeamMember({ headShot, title, firstName, lastName, about })
//     .then(res.status(201).send({ message: 'Team member successfully created' }))
//     .catch(error => next(error));
// });

router.post('/create', (req, res, next) => {
  const { headShot, title, firstName, lastName, about } = req.body;
  TeamTable.createTeamMemberBucket({ headShot, firstName, lastName })
    .then(data => {
      TeamTable.createTeamMember({
        headShot: data,
        title,
        firstName,
        lastName,
        about
      })
        .then(() =>
          res.status(201).send({ message: 'Team member successfully created.' })
        )
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

router.get('/', (req, res, next) => {
  TeamTable.getTeam()
    .then(data => res.send(data))
    .catch(error => next(error));
});

module.exports = router;
