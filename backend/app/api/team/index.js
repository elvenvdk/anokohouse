const { Router } = require('express');
const TeamTable = require('../../team/table');
const { authenticatedUser } = require('../user/helper');

const router = Router();

// Create team member
router.post('/create', (req, res, next) => {
  const { headShot, title, firstName, lastName, about } = req.body;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      TeamTable.createTeamMemberObject({ headShot, firstName, lastName })
        .then(data => {
          const { Bucket, Key } = data.bucketData;
          TeamTable.createTeamMember({
            headShot: `${Bucket}.s3.amazonaws.com/${Key}`,
            title,
            firstName,
            lastName,
            about
          })
            .then(() =>
              res
                .status(201)
                .send({ message: 'Team member successfully created.' })
            )
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

// Edit team member
router.put('/update/:id', (req, res, next) => {
  const { headShot, title, firstName, lastName, about } = req.body;
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      if (!headShot) {
        TeamTable.updateTeamMember({
          id,
          title,
          firstName,
          lastName,
          about
        })
          .then(() =>
            res
              .status(201)
              .send({ message: 'Team member successfully updated' })
          )
          .catch(error => next(error));
      } else {
        TeamTable.createTeamMemberObject({ headShot, firstName, lastName })
          .then(data => {
            TeamTable.updateTeamMember({
              headShot: data,
              title,
              firstName,
              lastName,
              about
            })
              .then(() =>
                res
                  .status(201)
                  .send({ message: 'Team member successfully updated' })
              )
              .catch(error => {
                throw error;
              });
          })
          .catch(error => {
            throw error;
          });
      }
    })
    .catch(error => next(error));
});

// View team
router.get('/', (req, res, next) => {
  TeamTable.getTeam()
    .then(data => {
      res.send(data);
    })
    .catch(error => next(error));
});

// View team member
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  TeamTable.getTeamMember({ id })
    .then(data => res.send(data))
    .catch(error => next(error));
});

// Delete team member
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const { sessionString } = req.cookies;
  authenticatedUser({ sessionString })
    .then(TeamTable.deleteTeamMember({ id }))
    .then(() => res.send({ message: 'Team member successfully deleted' }))
    .catch(error => next(error));
});

module.exports = router;
