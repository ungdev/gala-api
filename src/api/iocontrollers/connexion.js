module.exports = (app, io) => {
  io.on('connection', async socket => {
    console.log('CONNEXION')
    try {
      const { Partner, Message } = app.locals.models

      const partners = await Partner.findAll()
      const messages = await Message.findAll()
      socket.emit('partners', partners)
      socket.emit('messages', messages)
      socket.on('disconnect', () => {
        console.log('DISCONNEXION')
      })
      
    } catch (e) {
      console.log(e)
    }
  })
}
