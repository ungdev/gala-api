const errorHandler = require('../../utils/errorHandler')
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.get('/events', async (req, res) => {
    const { Event } = app.locals.models
    try {
      const events = await Event.findAll({
        where: {
          visible: true
        },
        order: [
          ['start', 'ASC']
        ]
      })

      return res
        .status(200)
        .json(events)
    } catch (err) {
      errorHandler(err, res)
    }
  })

  app.get('/events/all', [isAuth('events-get-all'), isAdmin('events-get-all')])
  app.get('/events/all', async (req, res) => {
    const { Event } = app.locals.models
    try {
      const events = await Event.findAll({
        order: [
          ['start', 'ASC']
        ]
      })

      return res
        .status(200)
        .json(events)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
