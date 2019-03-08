const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)

module.exports = app => {
  app.put('/events/:id', [
    check('name')
      .optional()
      .isString(),
    check('start')
      .optional()
      .isString(),
    check('end')
      .optional()
      .isString(),
    check('place')
      .optional()
      .isString(),
    check('image')
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

  app.put('/events/:id', async (req, res) => {
    const { Event } = app.locals.models

    // Update event
    try {
      let event = await Event.findById(req.params.id)
      if (!event)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
          .end()
      await event.update(req.body)
      log.info(`Event ${event.name} updated`)
      return res
        .status(200)
        .json(event)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
