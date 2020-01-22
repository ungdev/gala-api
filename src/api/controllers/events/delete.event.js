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

    try {
      let event = await Event.findByPk(req.params.id)
      if (!event)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
      log.info(`Event ${event.name} deleted`)
      await event.destroy()
      fs.unlinkSync(path.join(__dirname, '../../../..', event.image))
      return res
        .status(200)
        .json(event)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
