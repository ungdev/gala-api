module.exports = (app, io) => {
  io.on('connection', async socket => {
    console.log('CONNEXION')
    try {
      const { Censored, Event, Partner, Message, Tweet } = app.locals.models

      const events = await Event.findAll({ where: { visible: 1 } })
      const partners = await Partner.findAll({ where: { visible: 1 } })
      const messages = await Message.findAll({ order: [['createdAt', 'ASC']] })
      const censoreds = await Censored.findAll({ order: [['word', 'ASC']] })
      const tweets = await Tweet.findAll({ order: [['createdAt', 'DESC']] })
      socket.emit('events', events)
      socket.emit('partners', partners)
      socket.emit('messages', messages)
      socket.emit('censoreds', censoreds)
      socket.emit('tweets', tweets)
      socket.on('disconnect', () => {
        console.log('DISCONNEXION')
      })
    } catch (e) {
      console.log(e)
    }
  })
}
