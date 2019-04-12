const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.put('/messages/:id', [
    check('content')
      .isString()
      .exists(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])
  app.put('/messages/:id', [
    isAuth('message-modify'),
    isAdmin('message-modify')
  ])
  app.put('/messages/:id', async (req, res) => {
    const { Message } = app.locals.models
    try {
      let message = await Message.findByPk(req.params.id)
      await message.update(req.body)
      await message.setUser(req.user)

      const messages = await Message.findAll({ order: [['createdAt', 'ASC']] })
      app.locals.io.emit('messages', messages)

      log.info(`Message ${message.content} modified`)
      return res
        .status(200)
        .json(message)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
