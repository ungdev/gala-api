const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')

module.exports = app => {
  app.post('/partners', [
    check('name')
      .exists()
      .isString(),
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

  app.post('/partners', async (req, res) => {
    const { Partner } = req.app.locals.models

    const partner = await Partner.create(req.body)

    return res
      .status(200)
      .json(partner)
      .end()
  })
}
