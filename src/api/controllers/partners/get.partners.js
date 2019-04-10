const errorHandler = require('../../utils/errorHandler')
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.get('/partners', async (req, res) => {
    const { Partner } = req.app.locals.models
    try {
      const partners = await Partner.findAll({
        where: {
          visible: true
        }
      })

      return res
        .status(200)
        .json(partners)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })

  app.get('/partners/all', [isAuth('partners-get-all'), isAdmin('partners-get-all')])
  app.get('/partners/all', async (req, res) => {
    const { Partner } = req.app.locals.models
    try {
      const partners = await Partner.findAll()

      return res
        .status(200)
        .json(partners)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
