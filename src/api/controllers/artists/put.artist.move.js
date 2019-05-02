const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.put('/artist/:id/move', [
    check('shift')
      .exists()
      .isIn([-1, 1]),
    validateBody()
  ])
  app.put('/artist/:id/move', [isAuth('artists-modify'), isAdmin('artists-modify')])
  app.put('/artist/:id/move', async (req, res) => {
    const { Artist } = app.locals.models
    try {
      const artists = await Artist.findAll()

      // find current artist
      let currentArtist = artists.find(artist => artist.id === req.params.id)

      // find the other artist to switch index with
      let switchArtist = artists.find(artist => artist.index === currentArtist.index + req.body.shift)

      if(!switchArtist) {
        return res
          .status(400)
          .end()
      }

      // Switch indexes
      await currentArtist.update({
        index: currentArtist.index + req.body.shift
      })
      await switchArtist.update({
        index: switchArtist.index - req.body.shift
      })

      log.info(`Artist ${currentArtist.name} moved`)
      return res
        .status(200)
        .json(switchArtist.id)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
