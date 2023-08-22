import nodemailer from 'nodemailer'

const email = process.env.NODEMAILER_EMAIL
const password = process.env.NODEMAILER_PASSWORD
const sendmail = 'adityasawant09@gmail.com'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
})

const handler = async (req, res) => {
  try {
    await transporter.sendMail({
      from: email,
      to: sendmail,
      subject: 'Reset Your Agenda Builder Password',
      text: 'This is a test email from Next.js using Nodemailer.',
      html: '<b>Your New password is: </b>'
    })
    return res.status(200).json({ message: 'Email sent successfully.' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export default handler
