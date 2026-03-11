import sgMail from "@sendgrid/mail";

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ email, subject, message }) => {

    try {

        const msg = {
            to: email,
            from: "State Swad by Nishant <nishantkumar6205003458@gmail.com>",
            subject: subject,
            html: message,
        };

        await sgMail.send(msg);

        console.log("Email sent successfully");

    } catch (error) {

        console.error("SendGrid Email Error:", error);

    }

};