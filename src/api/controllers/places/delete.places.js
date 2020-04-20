const errorHandler = require('../../utils/errorHandler')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')
const fs = require('fs')

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
      fs.unlinkSync(path.join(__dirname, '../../../..', place.image))
      const places = await Place.findAll({ where: { visible: 1 } })
      app.locals.io.emit('places', places)
      return res
        .status(200)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
