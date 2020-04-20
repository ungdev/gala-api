const errorHandler = require('../../utils/errorHandler')
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.get('/places', async (req, res) => {
    const { Place } = req.app.locals.models
    try {
      const places = await Place.findAll({
        where: {
          visible: true
        },
        order: [
          ['name', 'ASC']
        ]
      })

      return res
        .status(200)
        .json(places)
    } catch (err) {
      errorHandler(err, res)
    }
  })

  app.get('/places/all', [isAuth('places-get-all'), isAdmin('places-get-all')])
  app.get('/places/all', async (req, res) => {
    const { Place } = req.app.locals.models
    try {
      const places = await Place.findAll({
        order: [
          ['name', 'ASC']
        ]
      })

      return res
        .status(200)
        .json(places)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
