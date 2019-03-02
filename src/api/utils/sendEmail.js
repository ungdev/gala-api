const nodemailer = require('nodemailer')
const log = require('./log')(module)

/**
 * Infos expected :
 *  - to
 *  - subject
 *  - html
 *  - text (optional)
 */ 

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD
  }
});

transporter.verify(error => {
  if(error) {
    log.info('Error when creating SMTP transport :\n', error)
  }
  else {
    log.info('Created SMTP transport successfully')
  }
})

module.exports = async (infos) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: infos.to,
    subject: infos.subject,
    html: infos.html,
    text: infos.text
  })
}
