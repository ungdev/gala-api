const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.post('/places', [
    check('name')
      .exists()
      .isString(),
    check('start')
      .exists()
      .isString(),
    check('end')
      .exists()
      .isString(),
    check('placeType')
      .exists()
      .isIn(['EAT', 'stage', 'food', 'rechargement', 'prevention', 'entry', 'animation', 'aidStation', 'cloakroom', 'other']),
    check('description')
      .optional()
      .isString(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])
  app.post('/places', [isAuth('places-create'), isAdmin('places-create')])
  app.post('/places', async (req, res) => {
    const { Place } = app.locals.models
    try {
      let place = await Place.create(req.body)
      log.info(`Place ${place.name} created`)
      return res
        .status(200)
        .json(place)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
