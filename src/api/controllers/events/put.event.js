const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)

module.exports = app => {
  app.put('/event', [
    check('id')
      .optional()
      .isUUID(),
    check('name')
      .exists()
      .isString(),
    check('start')
      .exists()
      .isString(),
    check('end')
      .exists()
      .isString(),
    check('place')
      .exists()
      .isString(),
    check('image')
      .exists()
      .isString(),
    check('description')
      .optional()
      .isString(),
    check('artist')
      .optional()
      .isString(),
    check('artistLink')
      .optional()
      .isString(),
    check('visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])

  app.put('/event', async (req, res) => {
    const { Event } = app.locals.models
    let event = null;

    if(req.body.id) {
      // Update event
      await Event.update(
        {
          name: req.body.name,
          start: req.body.start,
          end: req.body.end,
          place: req.body.place,
          image: req.body.image,
          description: req.body.description,
          artist: req.body.artist,
          artistLink: req.body.artistLink,
          visible: req.body.visible
        },
        {
          where: { id: req.body.id }
        }
      )

      event = await Event.findByPk(req.body.id)
    }
    else {
      // Create event
      event = await Event.create({
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        place: req.body.place,
        image: req.body.image,
        description: req.body.description,
        artist: req.body.artist,
        artistLink: req.body.artistLink,
        visible: req.body.visible
      })
    }

    return res
      .status(200)
      .json(event)
      .end();
  })
}
