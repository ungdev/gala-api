const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  app.post('/artists', [
    check('name')
      .isString()
      .exists(),
    check('image')
      .exists()
      .isString(),
    check('link')
      .exists()
      .isString(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])
  app.post('/artists', [isAuth('artists-create'), isAdmin('artists-create')])
  app.post('/artists', async (req, res) => {
    const { Artist } = app.locals.models
    try {
      const files = fs.readdirSync(path.join(__dirname, '../../../../temp'))
      let file = files.find(f => f.indexOf(req.body.image) !== -1)
      const oldfile = path.join(__dirname, '../../../../temp', file)
      const newfile = path.join(__dirname, '../../../../images', file)
      fs.copyFileSync(oldfile, newfile)
      fs.unlinkSync(oldfile)

      let artist = await Artist.create({ ...req.body, image: '/images/' + file })
      log.info(`Artist ${artist.name} created`)
      return res
        .status(200)
        .json(artist)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
