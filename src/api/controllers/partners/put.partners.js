const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const log = require('../../utils/log')(module)

module.exports = app => {
  app.put('/partners', [
    check('partners.*.id')
      .optional()
      .isUUID(),
    check('partners.*.name')
      .exists()
      .isString(),
    check('partners.*.image')
      .exists()
      .isString(),
    check('partners.*.url')
      .exists()
      .isString(),
    check('partners.*.description')
      .optional()
      .isString(),
    check('partners.*.visible')
      .optional()
      .isBoolean(),
    validateBody()
  ])

  app.put('/partners', async (req, res) => {
    const { Partner } = app.locals.models

    // For each partner
    await req.body.partners.forEach(async partner => {
      if(partner.id) {
        // Update partner
        await Partner.update(
          {
            name: partner.name,
            image: partner.image,
            url: partner.url,
            description: partner.description,
            visible: partner.visible
          },
          {
            where: { id: partner.id }
          }
        )
      }
      else {
        // Create partner
        await Partner.create({
          name: partner.name,
          image: partner.image,
          url: partner.url,
          description: partner.description,
          visible: partner.visible
        })
      }
    })

    const partners = await Partner.findAll();
    
    return res
      .status(200)
      .json(partners)
      .end();
  })
}
