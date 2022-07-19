const nodemailer = require("nodemailer")

module.exports = sendEmail = async (options) => {
  const testAccount = await nodemailer.createTestAccount()
  console.log(testAccount)
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    // service: process.env.SMPT_SERVICE,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  const mailOptions = {
    from: testAccount.user,
    to: options.email,
    subject: options.subject,
    message: options.message,
  }

  await transporter.sendMail(mailOptions)
}
