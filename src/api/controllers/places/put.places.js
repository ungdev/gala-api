const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.put('/places/:id', [
    check('name')
      .isString()
      .exists(),
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
  app.put('/places/:id', [
    isAuth('places-modify'),
    isAdmin('places-modify')
  ])
  app.put('/places/:id', async (req, res) => {
    const { Place } = app.locals.models
    try {
      let place = await Place.findByPk(req.params.id)
      await place.update(req.body)
      log.info(`Place ${place.name} modified`)
      return res
        .status(200)
        .json(place)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
