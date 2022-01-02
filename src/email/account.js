const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')
dotenv.config()

const api_key = process.env.SENDGRID_API_KEY
sgMail.setApiKey(api_key)

let sender = process.env.SENDER

const sendEmail = (email,name) =>{
  sgMail.send({
    to: email,
    from: sender,
    subject: 'Thanks for signing Up with task-bot',
    html: 
    `<h1 align=center>Congratulations !</h1><br>
    <p>Hey ${name}, welcome to myTasks.io , we are super happy that you have signed up with us 🥳🥳</p>`
  })
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}


const cancelEmail = (email,name) =>{
  sgMail.send({
    to: email,
    from: sender,
    subject: 'Sorry to know that this is our end.',
    html: `<p>We are sorry ${name} that you are deleting your account at myTasks.io. Hoping to see you again in future !</p>`,
  })
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = {
  sendEmail,
  cancelEmail
}