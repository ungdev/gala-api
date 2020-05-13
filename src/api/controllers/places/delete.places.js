const errorHandler = require('../../utils/errorHandler')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')

module.exports = app => {
  app.delete('/places/:id', [
    isAuth('places-delete'),
    isAdmin('places-delete')
  ])
  app.delete('/places/:id', async (req, res) => {
    const { Place } = app.locals.models

    try {
      let place = await Place.findByPk(req.params.id)
      if (!place)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
      log.info(`Place ${place.name} deleted`)
      await place.destroy()
      return res
        .status(200)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
