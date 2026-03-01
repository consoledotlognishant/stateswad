import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pageStyles/Contact.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
            <Navbar />

            <section className="contact-hero">
                <h1>Contact Us</h1>
                <p>We would love to hear from you. Let’s connect.</p>
            </section>

            <section className="contact-container">

                {/* LEFT SIDE INFO */}
                <div className="contact-info">
                    <h2>Get In Touch</h2>

                    <p>
                        Whether you have a question about products, bulk orders,
                        collaborations, or just want to say hello —
                        we’re always ready to connect.
                    </p>

                    <div className="contact-details">
                        <div>
                            <strong>📞 WhatsApp</strong>
                            <a
                                href="https://wa.me/6205003458"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>

                        <div>
                            <strong>📧 Email</strong>
                            <a href="mailto:YOUR_EMAIL">
                                nishantkumar6205003458@gmail.com
                            </a>
                        </div>

                        <div>
                            <strong>📍 Location</strong>
                            <p>Bhubaneswar, Odisha, India</p>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="#">Instagram</a>
                        <a href="#">LinkedIn</a>
                        <a href="#">Facebook</a>
                    </div>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="contact-form">
                    <h2>Send Us A Message</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">Send Message</button>
                    </form>
                </div>

            </section>

            <Footer />
        </>
    );
}

export default Contact;