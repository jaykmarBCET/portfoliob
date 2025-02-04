import nodemailer from  'nodemailer';


export  const transporter  = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // or 'STARTTLS'
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }

})


export default transporter;