const { Router } = require('express');
const PartnersTable = require('../../partners/table');
const { authenticatedUser } = require('../user/helper');

const router = Router();

// Create partner
router.post('/create', (req, res, next) => {
  const { image, title, about, tags } = req.body;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      PartnersTable.createPartnerBucket({ image, title })
        .then(data => {
          const { Bucket, Key } = data.bucketData;
          PartnersTable.createPartner({
            image: `${Bucket}.s3.amazonaws.com/${Key}`,
            title,
            about,
            tags
          })
            .then(() =>
              res.status(201).send({ message: 'Partner successfully created.' })
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

// Edit partner
router.put('/update/:id', (req, res, next) => {
  const { image, title, about, tags } = req.body;
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      if (!headShot) {
        PartnersTable.updatePartner({
          id,
          title,
          about,
          tags
        })
          .then(() =>
            res
              .status(201)
              .send({ message: 'Team member successfully updated' })
          )
          .catch(error => next(error));
      } else {
        PartnersTable.createPartnerObject({ headShot, firstName, lastName })
          .then(data => {
            PartnersTable.updatePartner({
              image: `${Bucket}.s3.amazonaws.com/${Key}`,
              title,
              about,
              tags
            })
              .then(() =>
                res
                  .status(201)
                  .send({ message: 'partner successfully updated' })
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

// View partners
router.get('/', (req, res, next) => {
  PartnersTable.getPartners()
    .then(data => {
      res.send(data);
    })
    .catch(error => next(error));
});

// View partner
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  PartnersTable.getPartner({ id })
    .then(data => res.send(data))
    .catch(error => next(error));
});

// Delete team member
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const { sessionString } = req.cookies;
  authenticatedUser({ sessionString })
    .then(PartnersTable.deleteTeamMember({ id }))
    .then(() => res.send({ message: 'Partner successfully deleted' }))
    .catch(error => next(error));
});

module.exports = router;
