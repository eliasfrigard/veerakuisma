import nodemailer from 'nodemailer'

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default async function sendEmail(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  })

  if (req.body.address) {
    return res.status(200).send({ success: 'Email sent successfully' })
  }

  const name = escapeHtml(req.body.name)
  const email = escapeHtml(req.body.email)
  const phone = escapeHtml(req.body.phone)
  const messageText = escapeHtml(req.body.message)

  const message = {
    from: 'fiddler@veerakuisma.com',
    to: 'fiddler@veerakuisma.com',
    subject: `(www.veerakuisma.com) New message from ${name}`,
    html: `
        <html>
          <head>
            <style>
              /* Define your CSS styles here */
              body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333333;
              }

              h1 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333333;
              }

              p {
                margin-bottom: 20px;
                margin-top: 20px;
              }

              ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
              }

              li {
                margin-bottom: 10px;
              }

              /* Define your custom styles here */
              .message-container {
                background-color: #f5f5f5;
                padding: 25px;
                border-radius: 10px;
              }

              .message-container h2 {
                margin-top: 0;
                margin-bottom: 6px;
              }
            </style>
          </head>
          <body>
            <div class="message-container">
              <h2>New message from www.veerakuisma.com</h2>
              <p>${messageText}</p>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone}</li>
              </ul>
            </div>
          </body>
        </html>
      `,
  }

  try {
    await transporter.sendMail(message)
    res.status(200).send({ success: 'Email sent successfully' })
  } catch (error) {
    res.status(500).send({ error: 'Error sending email' })
  }
}
