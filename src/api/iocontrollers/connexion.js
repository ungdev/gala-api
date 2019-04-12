module.exports = (app, io) => {
  io.on('connection', async socket => {
    console.log('CONNEXION')
    try {
      const { Partner, Message, Tweet } = app.locals.models

      const partners = await Partner.findAll()
      const messages = await Message.findAll()
      const tweets = await Tweet.findAll({ where: { visible: true } })
      socket.emit('partners', partners)
      socket.emit('messages', messages)
      socket.emit('tweets', tweets)
      socket.on('disconnect', () => {
        console.log('DISCONNEXION')
      })
    } catch (e) {
      console.log(e)
    }
  })
}
