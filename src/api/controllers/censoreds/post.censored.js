const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.post('/censoreds', [
    check('word')
      .isString()
      .exists(),
    check('level')
      .optional()
      .isNumeric(),
    validateBody()
  ])
  app.post('/censoreds', [isAuth('censored-create'), isAdmin('censored-create')])
  app.post('/censoreds', async (req, res) => {
    const { Censored } = app.locals.models
    try {
      let censored = await Censored.create(req.body)
      const censoreds = await Censored.findAll({ order: [['word', 'ASC']] })
      app.locals.io.emit('censoreds', censoreds)
      log.info(`Censore ${censored.word} created`)
      return res
        .status(200)
        .json(censored)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
