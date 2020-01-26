const log = require('../utils/log')(module)

module.exports = route => async (req, res, next) => {
  if (
    req.user &&
    req.user.Permissions &&
    req.user.Permissions.find(permission => permission === 'admin')
  )
    next()
  else {
    log.error('Tried to access admin privilege without permission ', route)
    return res
      .status(401)
      .json({ error: 'NOT_ADMIN' })
      .end()
  }
}
