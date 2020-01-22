const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  app.post('/partners', [
    check('name')
      .isString()
      .exists(),
    check('image')
      .exists()
      .isString(),
    check('url')
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
  app.post('/partners', [isAuth('partners-create'), isAdmin('partners-create')])
  app.post('/partners', async (req, res) => {
    const { Partner } = app.locals.models
    try {
      const files = fs.readdirSync(path.join(__dirname, '../../../../temp'))
      let file = files.find(f => f.indexOf(req.body.image) !== -1)
      const oldfile = path.join(__dirname, '../../../../temp', file)
      const newfile = path.join(__dirname, '../../../../images', file)
      fs.copyFileSync(oldfile, newfile)
      fs.unlinkSync(oldfile)

      let partner = await Partner.create({
        ...req.body,
        image: '/images/' + file
      })
      const partners = await Partner.findAll({ where: { visible: 1 } })
      app.locals.io.emit('partners', partners)
      log.info(`Partner ${partner.name} created`)
      return res
        .status(200)
        .json(partner)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
