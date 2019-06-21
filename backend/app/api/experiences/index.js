const { Router } = require('express');
const ExperiencesTable = require('../../experiences/table');
const { authenticatedUser } = require('../user/helper');

const router = Router();

// Create experience
router.post('/create', (req, res, next) => {
  const { image, title, videoUrl, about } = req.body;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      ExperiencesTable.createExperienceBucket({ image, title })
        .then(data => {
          const { Bucket, Key } = data.bucketData;
          ExperiencesTable.createExperience({
            image: `${Bucket}.s3.amazonaws.com/${Key}`,
            title,
            videoUrl,
            about
          })
            .then(() =>
              res
                .status(201)
                .send({ message: 'Experience successfully created.' })
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
        ExperiencesTable.updatePartner({
          id,
          title,
          about,
          tags
        })
          .then(() =>
            res.status(201).send({ message: 'Experience successfully updated' })
          )
          .catch(error => next(error));
      } else {
        ExperiencesTable.createExperienceObject({
          headShot,
          firstName,
          lastName
        })
          .then(data => {
            const { Bucket, Key } = data.bucketData;
            ExperiencesTable.updateExperience({
              id,
              image: `${Bucket}.s3.amazonaws.com/${Key}`,
              title,
              videoUrl,
              about
            })
              .then(() =>
                res
                  .status(201)
                  .send({ message: 'Experience successfully updated' })
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

// View experience
router.get('/', (req, res, next) => {
  ExperiencesTable.getExperiences()
    .then(data => {
      res.send(data);
    })
    .catch(error => next(error));
});

router.get('/buckets', (req, res, next) => {
  ExperiencesTable.getBuckets()
    .then(data => res.send(data))
    .catch(error => next(error));
});

router.delete('/bucket/:name', (req, res, next) => {
  const { name } = req.params;
  ExperiencesTable.deleteBucket({ bucket: name })
    .then(data => res.send({ data, message: 'Bucket successfully deleted' }))
    .catch(error => next(error));
});

router.delete('/bucket-object/:name/:key', (req, res, next) => {
  const { name, key } = req.params;
  ExperiencesTable.deleteBucketObject({ bucket: name, key: key })
    .then(data =>
      res.send({ data, message: 'Bucket object successfully deleted' })
    )
    .catch(error => next(error));
});

// View experience
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  ExperiencesTable.getExperience({ id })
    .then(data => res.send(data))
    .catch(error => next(error));
});

// Delete experience
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const { sessionString } = req.cookies;
  authenticatedUser({ sessionString })
    .then(ExperiencesTable.deleteExperience({ id }))
    .then(() => res.send({ message: 'Experience successfully deleted' }))
    .catch(error => next(error));
});

module.exports = router;
