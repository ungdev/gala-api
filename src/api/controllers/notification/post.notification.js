const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.post('/notifications', [
    check('title')
      .isString()
      .exists(),
    check('content')
      .isString()
      .exists(),
    validateBody()
  ])
  app.post('/notifications', [isAuth('notification-create'), isAdmin('notification-create')])
  app.post('/notifications', async (req, res) => {
    try {
      //TODO link to onesignal
      const notification = req.body
      app.locals.io.emit('notification', notification)
      log.info(`Notification ${notification.title} sent`)
      return res
        .status(200)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
