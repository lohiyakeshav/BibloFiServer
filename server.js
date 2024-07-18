// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'keshavlohiyabusiness@gmail.com',
        pass: 'ltpe qqxn navu iddw'
    }
});

app.post('/send-email', (req, res) => {
    console.log("Sending")
    const { email, password, name } = req.body;

    console.log(email, password, name )
    // Read the HTML template file
    const templatePath = path.join(__dirname, 'public', 'emailtemplate.html');
    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading email template.');
        }

        // Customize the email content with user-specific details
        const mailOptions = {
            from: 'keshavlohiyabusiness@gmail.com',
            to: email,
            subject: 'Librarian Credentials',
            html: data.replace('{{name}}', name) // Replace template placeholder with actual name
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('Email sent: ' + info.response);
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
