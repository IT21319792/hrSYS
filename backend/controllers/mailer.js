import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js'; // Make sure this file contains your Gmail credentials

const nodeConfig = {
    service: 'gmail', // Use 'gmail' for Gmail's SMTP service
    auth: {
        user: ENV.EMAIL, // Your Gmail address
        pass: ENV.PASSWORD, // Your Gmail app password or your account password if not using 2-Step Verification
    },
};

const transporter = nodemailer.createTransport(nodeConfig);

const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
});

export const registerMail = async (req, res) => {
    const { userEmail, username, text, subject } = req.body;

    // Body of email
    const email = {
        body: {
            name: username,
            intro: text || 'Welcome to Mailgen! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: 'https://mailgen.js/'
                }
            },
        }
    };

    const emailBody = MailGenerator.generate(email);
    const message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || 'Welcome!',
        html: emailBody
    };

    try {
        const info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (err) {
        console.error('Error occurred:', err.message);
        res.status(500).send({ error: 'Failed to send email' });
    }
};
