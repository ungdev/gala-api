const { check } = require('express-validator/check')
const validateBody = require('../../middlewares/validateBody')
const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')

const sendEmail = require('../../utils/sendEmail')

let htmlFile = ''
let textFile = ''

// Read contactEmail.html
fs.readFile(path.join(__dirname, '../../templates/contactEmail.html'), (err, data) => {
  if(err) {
    log.error('failed to read contactEmail.html\n', err)
  }
  else {
    htmlFile = data.toString()
  }
})

// Read contactEmail.txt
fs.readFile(path.join(__dirname, '../../templates/contactEmail.txt'), (err, data) => {
  if(err) {
    log.error('failed to read contactEmail.txt\n', err)
  }
  else {
    textFile = data.toString()
  }
})

module.exports = (app) => {
  app.post('/contact', [
    check('name')
      .exists()
      .isString()
      .not().isEmpty(),
    check('email')
      .exists()
      .isEmail(),
    check('message')
      .exists()
      .isString()
      .not().isEmpty(),
    validateBody()
  ])

  app.post('/contact', (req, res) => {
    const dateOptions = {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }

    const data = {
      ...req.body,
      date: new Date().toLocaleDateString('en-US', dateOptions)
    }

    sendEmail({
      to: process.env.EMAIL_CONTACT_TO,
      subject: `Nouveau message de ${req.body.name}`,
      html: Mustache.render(htmlFile, data),
      text: Mustache.render(textFile, data)
    })

    return res
      .status(200)
      .end()
  })
}
