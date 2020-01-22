const errorHandler = require('../../utils/errorHandler')
const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')
const axios = require('axios')

module.exports = app => {
  app.post('/notifications', [
    check('title')
      .isString()
      .exists(),
    check('content')
      .isString()
      .exists(),
    check('mobile')
      .isBoolean()
      .optional(),
    validateBody()
  ])
  app.post('/notifications', [
    isAuth('notification-create'),
    isAdmin('notification-create')
  ])
  app.post('/notifications', async (req, res) => {
    try {
      if (req.body.mobile) {
        let included_segments = ['test'] // send only to test device registered on onesignal
        if(process.env.NODE_ENV === 'production') {
          included_segments = ['All']
        }
        await axios.post(
          'https://onesignal.com/api/v1/notifications',
          {
            app_id: process.env.APP_ID,
            included_segments,
            headings: { en: req.body.title },
            contents: { en: req.body.content }
          },
          {
            headers: {
              Authorization:
                `Basic ${process.env.REST_API_KEY}`
            }
          }
        )
      }
    } catch (error) {
      log.info(error.response.data.errors)
      return res
        .status(400)
        .json(error.response.data.errors)
    }
    try {
      app.locals.io.emit('notification', req.body)
      log.info(`Notification ${req.body.title} sent`)
      return res.status(200).end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
