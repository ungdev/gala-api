const errorHandler = require('../../utils/errorHandler');
const { check } = require('express-validator/check');
const validateBody = require('../../middlewares/validateBody');
const log = require('../../utils/log')(module);
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');
const axios = require('axios');
const { Expo } = require('expo-server-sdk');

let expo = new Expo();

module.exports = (app) => {
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
    validateBody(),
  ]);
  app.post('/notifications', [isAuth('notification-create'), isAdmin('notification-create')]);
  app.post('/notifications', async (req, res) => {
    const { Token } = app.locals.models;
    try {
      if (req.body.mobile) {
        let included_segments = ['test']; // send only to test device registered on onesignal
        const isProdEnvironement = process.env.NODE_ENV === 'production';
        if (isProdEnvironement) {
          included_segments = ['All'];
        }
        try {
          await axios.post(
            'https://onesignal.com/api/v1/notifications',
            {
              app_id: process.env.APP_ID,
              included_segments,
              headings: { en: req.body.title },
              contents: { en: req.body.content },
            },
            {
              headers: {
                Authorization: `Basic ${process.env.REST_API_KEY}`,
              },
            },
          );
        } catch (error) {
          log.info(error.response.data.errors);
        }

        const tokenInstances = await Token.findAll({
          attributes: ['token'],
          where: isProdEnvironement
            ? {}
            : {
                isDevDevice: true,
              },
        });
        const tokens = tokenInstances.map((tokenInstance) => tokenInstance.token);
        let messages = [];
        for (let token of tokens) {
          if (!Expo.isExpoPushToken(token)) {
            log.info(`Push token ${token} is not a valid Expo push token`);
            continue;
          }
          messages.push({
            to: token,
            sound: 'default',
            title: req.body.title,
            body: req.body.content,
            data: { title: req.body.title, body: req.body.content },
          });
        }

        let chunks = expo.chunkPushNotifications(messages);
        for (let chunk of chunks) {
          try {
            await expo.sendPushNotificationsAsync(chunk);
          } catch (error) {
            log.info(error);
          }
        }
      }
    } catch (error) {
      log.info(error);
      return res.status(400).json(error);
    }
    try {
      app.locals.io.emit('notification', req.body);
      log.info(`Notification ${req.body.title} sent`);
      return res.status(200).end();
    } catch (err) {
      errorHandler(err, res);
    }
  });
};
