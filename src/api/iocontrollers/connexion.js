module.exports = (app, io) => {
  io.on('connection', socket => {
    console.log('CONNEXION')
    socket.on('disconnect', () => {
      console.log('DISCONNEXION')
    })
  })
}
