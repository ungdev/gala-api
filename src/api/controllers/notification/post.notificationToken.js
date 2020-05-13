const errorHandler = require('../../utils/errorHandler');
const { body } = require('express-validator');
const validateBody = require('../../middlewares/validateBody');
const log = require('../../utils/log')(module);

module.exports = (app) => {
  app.post('/expoTokens', [
    body('token')
      .isString()
      .exists(),
    validateBody(),
  ]);
  app.post('/expoTokens', async (req, res) => {
    const { Token } = app.locals.models;
    try {
      await Token.create({ token: req.body.token });
      return res.status(200).end();
    } catch (err) {
      errorHandler(err, res);
    }
  });
};
