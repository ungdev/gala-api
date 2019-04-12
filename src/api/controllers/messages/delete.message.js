const errorHandler = require('../../utils/errorHandler')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.delete('/messages/:id', [
    isAuth('message-delete'),
    isAdmin('message-delete')
  ])
  app.delete('/messages/:id', async (req, res) => {
    const { Message } = app.locals.models

    try {
      let message = await Message.findByPk(req.params.id)
      if (!message)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
          .end()
      log.info(`Message ${message.content} deleted`)
      await message.destroy()
      const messages = await Message.findAll({ order: [['createdAt', 'ASC']] })
      app.locals.io.emit('messages', messages)
      return res
        .status(200)
        .json('OK')
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
