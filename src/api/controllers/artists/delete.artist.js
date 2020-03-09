const errorHandler = require('../../utils/errorHandler')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  app.delete('/artists/:id', [isAuth('artists-delete'), isAdmin('artists-delete')])
  app.delete('/artists/:id', async (req, res) => {
    const { Artist, Link } = app.locals.models

    try {
      let artist = await Artist.findByPk(req.params.id)
      if (!artist)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
      log.info(`Artist ${artist.name} deleted`)
      await Link.destroy({
        where: {
          ArtistId: artist.id
        }
      })
      await artist.destroy()
      fs.unlinkSync(path.join(__dirname, '../../../..', artist.image))
      return res
        .status(200)
        .json(artist)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
