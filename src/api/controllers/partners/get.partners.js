const errorHandler = require('../../utils/errorHandler')


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
}
