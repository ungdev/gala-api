const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)

module.exports = app => {
  app.put('/partners/:id', [
    check('name')
      .optional()
      .isString(),
    check('image')
      .optional()
      .isString(),
    check('url')
      .optional()
      .isString(),
    check('description')
      .optional()
      .isString(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])

  app.put('/partners/:id', async (req, res) => {
    const { Partner } = app.locals.models

    try {
      let partner = await Partner.findByID(req.params.id)
      if (!partner)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
          .end()
      await partner.update(req.body)
      log.info(`Partner ${partner.name} modified`)
      return res
        .status(200)
        .json(partner)
        .end()
      } catch (err) {
        errorHandler(err, res)
      }
  })
}
