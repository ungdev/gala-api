const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  app.put('/places/:id', [
    check('name')
      .isString()
      .exists(),
    check('start')
      .exists()
      .isString(),
    check('end')
      .exists()
      .isString(),
    check('placeType')
      .exists()
      .isString(),
    check('description')
      .optional()
      .isString(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])
  app.put('/places/:id', [
    isAuth('places-modify'),
    isAdmin('places-modify')
  ])
  app.put('/places/:id', async (req, res) => {
    const { Place } = app.locals.models
    try {
      let place = await Place.findByPk(req.params.id)
      const files = fs.readdirSync(path.join(__dirname, '../../../../temp'))
      let file = files.find(f => f.indexOf(req.body.image) !== -1)
      if (file) {
        fs.unlinkSync(path.join(__dirname, '../../../..', place.image))
        const oldfile = path.join(__dirname, '../../../../temp', file)
        const newfile = path.join(__dirname, '../../../../images', file)
        fs.copyFileSync(oldfile, newfile)
        fs.unlinkSync(oldfile)
        await place.update({ ...req.body, image: '/images/' + file })
      } else {
        await place.update(req.body)
      }
      const places = await Place.findAll({ where: { visible: 1 } })
      app.locals.io.emit('places', places)

      log.info(`Place ${place.name} modified`)
      return res
        .status(200)
        .json(place)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
