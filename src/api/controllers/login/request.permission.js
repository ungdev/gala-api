const isAuth = require('../../middlewares/isAuth')
const errorHandler = require('../../utils/errorHandler')
const log = require('../../utils/log')(module)
const axios = require('axios')
/**
 * GET /user
 *
 * Response:
 * {
 *    user: User
 * }
 */
module.exports = app => {
  app.post('/request', [isAuth('user-fetch')])

  app.post('/request', async (req, res) => {
    try {
      log.info(`user ${req.user.full_name} requested permissions`)
      const link = process.env.LOGIN_REDIRECT_URL + '/admin/users/setadmin?id=' + req.user.id
      const text = `L'utilisateur ${
        req.user.full_name
      } souhaite obtenir des droits sur l'application TV. Cliquez ici pour les lui donner : <${link}|donner les droits administrateurs>`
      axios.post(
        process.env.SLACK_HOOK,
        { text },
        { headers: { 'Content-type': 'application/json' } }
      )
      res.status(200).end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
