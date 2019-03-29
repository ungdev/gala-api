const { check } = require('express-validator/check')
const oauth2 = require('simple-oauth2')
const axios = require('axios')

const log = require('../../utils/log')(module)
const validateBody = require('../../middlewares/validateBody')

module.exports = app => {
  app.get('/login', [
    check('authorization_code')
      .exists()
      .isString(),
    validateBody()
  ])

  app.get('/login', async (req, res) => {
    const { User } = app.locals.models
    let tokenUrl = ''

    try {
      // Create OAuth object
      const auth = oauth2.create({
        client: {
          id: process.env.ETUUTT_CLIENT_ID,
          secret: process.env.ETUUTT_CLIENT_SECRET
        },
        auth: {
          tokenHost: 'https://etu.utt.fr',
          tokenPath: '/api/oauth/token',
          authorizePath: '/api/oauth/authorize'
        }
      })

      // Save access token
      const token = await auth.authorizationCode.getToken({
        code: req.query.authorization_code
      })
      const accessToken = auth.accessToken.create(token)

      // Retrieve user infos
      const res = await axios.get(`https://etu.utt.fr/api/public/user/account?access_token=${accessToken.token.access_token}`)
      const studentId = res.data.data.studentId

      // Try to find the user
      let user = await User.findOne({
        where: {
          student_id: studentId
        }
      })

      if(user) {
        // Update user fields
        user.access_token = accessToken.token.access_token
        user.refresh_token = accessToken.token.refresh_token
        user.token_expires = accessToken.token.expires

        await user.save()
      }
      else {
        // Create new user in the db
        user = await User.create({
          student_id: studentId,
          access_token: accessToken.token.access_token,
          refresh_token: accessToken.token.refresh_token,
          token_expires: accessToken.token.expires
        })
      }

      // Return access token
      tokenUrl = `${user.id}:${user.access_token}`
    }
    catch(err) {
      log.error(err)
    }

    return res.redirect(`${process.env.LOGIN_REDIRECT_URL}?token=${tokenUrl}`)
  })
}
