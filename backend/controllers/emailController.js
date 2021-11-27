const sgMail = require('@sendgrid/mail')
const catchAsync = require("../utils/catchAsync");


exports.sendEmail = catchAsync(async (req, res, next) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'fassterthanflash@gmail.com', // Change to your recipient
    from: 'tausifahmed4802@gmail.com', // Change to your verified sender
    subject: 'Sendgrid test',
    text: 'lolololololololol',
    html: '<strong>lolololololololol</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
})