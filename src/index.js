const http = require('http')
const database = require('./database')
const main = require('./main')
const socketio = require('socket.io')

module.exports = async function(app, express) {
  const { sequelize, models } = await database()

  main(app)

  const server = http.Server(app)
  const io = socketio.listen(server)

  app.locals.app = app
  app.locals.server = server
  app.locals.db = sequelize
  app.locals.models = models
  app.locals.io = io

  if (process.send) {
    process.send('ready')
  }

  return app
}
