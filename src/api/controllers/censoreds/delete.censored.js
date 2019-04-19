const errorHandler = require('../../utils/errorHandler')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.delete('/censoreds/:id', [
    isAuth('censored-delete'),
    isAdmin('censored-delete')
  ])
  app.delete('/censoreds/:id', async (req, res) => {
    const { Censored } = app.locals.models

    try {
      let censored = await Censored.findByPk(req.params.id)
      if (!censored)
        return res
          .status(404)
          .json({ error: 'NOT_FOUND' })
          .end()
      log.info(`Censore ${censored.word} deleted`)
      await censored.destroy()
      const censoreds = await Censored.findAll({ order: [['word', 'ASC']] })
      app.locals.io.emit('censoreds', censoreds)
      return res
        .status(200)
        .json('OK')
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
