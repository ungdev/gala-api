const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)

module.exports = app => {
  app.post('/events', [
    check('name')
      .isString()
      .exists(),
    check('start')
      .exists()
      .isString(),
    check('end')
      .exists()
      .isString(),
    check('image')
      .exists()
      .isString(),
    check('place')
      .optional()
      .isString(),
    check('description')
      .optional()
      .isString(),
    check('artist')
      .optional()
      .isString(),
    check('artistLink')
      .optional()
      .isString(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])

  app.post('/events', async (req, res) => {
    const { Event } = app.locals.models
    try {
      if (req.body.visible === undefined) req.body.visible = true
      let event = await Event.create(req.body)
      log.info(`Event ${event.name} created`)
      return res
        .status(200)
        .json(event)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
