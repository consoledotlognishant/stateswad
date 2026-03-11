import sgMail from "@sendgrid/mail";

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ email, subject, message }) => {

    try {

        const msg = {
            to: email,
            from: process.env.SENDGRID_EMAIL, // verified sender email in SendGrid
            subject: subject,
            html: message,
        };

        await sgMail.send(msg);

        console.log("Email sent successfully");

    } catch (error) {

        console.error("SendGrid Email Error:", error);

    }

};