import nodemailer from "nodemailer";

export const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

};