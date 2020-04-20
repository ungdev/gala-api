const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  app.put('/artists/:id', [
    check('name')
      .exists()
      .isString(),
    check('links')
      .exists()
      .isString(),
    check('description')
      .exists()
      .isString(),
    check('image')
      .exists()
      .isString(),
    check('eventDate')
      .optional()
      .isString(),
    check('eventPlace')
      .optional()
      .isString(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])
  app.put('/artists/:id', [isAuth('artists-modify'), isAdmin('artists-modify')])
  app.put('/artists/:id', async (req, res) => {
    const { Artist, Link } = app.locals.models
    try {
      let artist = await Artist.findByPk(req.params.id)
      const files = fs.readdirSync(path.join(__dirname, '../../../../temp'))
      let file = files.find(f => f.indexOf(req.body.image) !== -1)
      if (file) {
        fs.unlinkSync(path.join(__dirname, '../../../..', artist.image))
        const oldfile = path.join(__dirname, '../../../../temp', file)
        const newfile = path.join(__dirname, '../../../../images', file)
        fs.copyFileSync(oldfile, newfile)
        fs.unlinkSync(oldfile)
        await artist.update({ ...req.body, image: '/images/' + file })
      } else {
        await artist.update(req.body)
      }

      await Link.destroy({
        where: {
          ArtistId: artist.id
        }
      })

      let links = JSON.parse(req.body.links)
      await Promise.all(links.map(async link => {
        await Link.create({
          type: link.type,
          uri: link.uri,
          ArtistId: artist.id,
        })
      }))

      log.info(`Artist ${artist.name} modified`)
      return res
        .status(200)
        .json(artist)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
