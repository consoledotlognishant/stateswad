import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, message }) => {
    try {

        await resend.emails.send({
            from: "State Swad by Nishant <onboarding@resend.dev>",
            to: email,
            subject: subject,
            html: message
        });

        console.log("Email sent successfully");

    } catch (error) {

        console.error("Email send error:", error);

    }
};