module.exports = app => {
  app.get('/partners', async (req, res) => {
    const { Partner } = req.app.locals.models
    const partners = await Partner.findAll({
      where: {
        visible: true
      }
    })

    return res
      .status(200)
      .json(partners)
      .end()
  })
}
