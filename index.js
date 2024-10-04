const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, etc.
  auth: {
    user: process.env.USER, // Your email
    pass: process.env.PASSWORD, // Your email password or an app-specific password
  },
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/send-email', (req, res) => {
  const { name, email, phone, subject, description } = req.body;
  console.log('Received data:', req.body); // Log the incoming data

  // Validate email
  if (!email) {
    return res.status(400).send('Email is required');
  }

  const mailOptions = {
    from: '<no-reply@gmail.com>', // Your sender email
    to: "kieshvaintellect@gmail.com", // Recipient's email
    subject: subject || 'New Enquiry',
    text: `You have received a new enquiry from:
    
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${description}

www.kieshvaintellect.com
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Thank You will contact you soon' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
