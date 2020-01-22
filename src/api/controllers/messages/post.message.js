const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.post('/messages', [
    check('content')
      .isString()
      .exists(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])
  app.post('/messages', [isAuth('message-create'), isAdmin('message-create')])
  app.post('/messages', async (req, res) => {
    const { Message } = app.locals.models
    try {
      let message = await Message.create(req.body)
      await message.setUser(req.user)
      const messages = await Message.findAll({ order: [['createdAt', 'ASC']] })
      app.locals.io.emit('messages', messages)
      log.info(`Message ${message.content} created`)
      return res
        .status(200)
        .json(message)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
