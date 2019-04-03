const errorHandler = require('../../utils/errorHandler')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  app.delete('/events/:id', [isAuth('events-delete'), isAdmin('events-delete')])
  app.delete('/events/:id', async (req, res) => {
    const { Event } = app.locals.models

    // Update event
    try {
      let event = await Event.findByPk(req.params.id)
      if (!event)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
          .end()
      log.info(`Event ${event.name} deleted`)
      fs.unlinkSync(path.join(__dirname, '../../../..', event.image))
      await event.destroy()
      return res
        .status(200)
        .json(event)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
