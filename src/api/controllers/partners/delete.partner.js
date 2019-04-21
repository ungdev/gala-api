const errorHandler = require('../../utils/errorHandler')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  app.delete('/partners/:id', [
    isAuth('partners-delete'),
    isAdmin('partners-delete')
  ])
  app.delete('/partners/:id', async (req, res) => {
    const { Partner } = app.locals.models

    try {
      let partner = await Partner.findByPk(req.params.id)
      if (!partner)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
          .end()
      log.info(`Partner ${partner.name} deleted`)
      await partner.destroy()
      fs.unlinkSync(path.join(__dirname, '../../../..', partner.image))
      const partners = await Partner.findAll({ where: { visible: 1 } })
      app.locals.io.emit('partners', partners)
      return res
        .status(200)
        .json('OK')
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
