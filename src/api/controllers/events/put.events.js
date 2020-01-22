const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const moment = require('moment')

module.exports = app => {
  app.put('/events', [
    check('minutes')
      .isNumeric()
      .exists(),
    validateBody()
  ])
  app.put('/events', [isAuth('events-delay'), isAdmin('events-delay')])
  app.put('/events', async (req, res) => {
    const { Event } = app.locals.models
    try {
      let events = await Event.findAll()
      events = events.filter(event => moment().isBefore(event.end))
      events = await Promise.all(
        events.map(async event => {
          const start = moment(event.start)
            .add(req.body.minutes, 'minutes')
            .format()
          const end = moment(event.end)
            .add(req.body.minutes, 'minutes')
            .format()
          await event.update({ start, end })
          return event
        })
      )
      events = await Event.findAll({ where: { visible: 1 } })
      app.locals.io.emit('events', events)
      log.info(`Delayed events by ${req.body.minutes} minutes`)
      return res.status(200).end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
