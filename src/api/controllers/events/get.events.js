const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)

module.exports = app => {
  app.get('/events', async (req, res) => {
    const { Event } = app.locals.models
    const events = await Event.findAll({
      where: {
        visible: true
      }
    })

    return res
      .status(200)
      .json(events)
      .end()
  })
}
