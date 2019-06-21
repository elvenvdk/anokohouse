const { Router } = require('express');
const MemberTable = require('../../members/table');
const { authenticatedUser } = require('../user/helper');

const router = Router();

// Create member
router.post('/create', (req, res, next) => {
  const { headShot, title, firstName, lastName, about } = req.body;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.createMemberObject({ headShot, firstName, lastName })
        .then(data => {
          const { Bucket, Key } = data.bucketData;
          MemberTable.createMember({
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
        MemberTable.updateMember({
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
        MemberTable.createMemberObject({ headShot, firstName, lastName })
          .then(data => {
            const { Bucket, Key } = data.bucketData;
            MemberTable.updateMember({
              id,
              headShot: `${Bucket}.s3.amazonaws.com/${Key}`,
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

// View member
router.get('/', (req, res, next) => {
  MemberTable.getMembers()
    .then(data => {
      res.send(data);
    })
    .catch(error => next(error));
});

// View member
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  MemberTable.getMember({ id })
    .then(data => res.send(data))
    .catch(error => next(error));
});

// Delete member
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const { sessionString } = req.cookies;
  authenticatedUser({ sessionString })
    .then(MemberTable.deleteMember({ id }))
    .then(() => res.send({ message: 'Team member successfully deleted' }))
    .catch(error => next(error));
});

module.exports = router;
