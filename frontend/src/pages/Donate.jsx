import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pageStyles/Donate.css";

function Donate() {
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handleDonate = () => {
        const numericAmount = Number(amount);

        if (!numericAmount || numericAmount < 1 || numericAmount > 10000) {
            alert("Please enter amount between ₹1 and ₹10,000");
            return;
        }

        navigate(`/process/payment?donation=${numericAmount}`);
    };

    const quickAmounts = [51, 101, 501, 1100];

    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="donate-hero">
                <h1>Not a Donation. A Gesture of Love.</h1>
                <p>
                    Festivals are meant to spread light, devotion and joy.
                    On sacred occasions like Maha Shivratri, Krishna Janmashtami
                    and other holy celebrations, we prepare Kheer Prasad
                    with purity and devotion —
                    offering it to Gau Mata and distributing it to people
                    who deserve a moment of warmth and celebration.
                    <br /><br />
                    If you wish to be part of this seva,
                    we welcome you with folded hands.
                </p>
            </section>


            {/* MISSION */}
            <section className="donate-mission">
                <div className="mission-container">

                    {/* LEFT IMAGE */}
                    <div className="mission-image">
                        <img src="/images/kheer.jpeg" alt="Festival Seva" />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="mission-content">
                        <h2>Why We Do This</h2>

                        <p>
                            We started this not as an organization —
                            but as students who missed home.
                            <br /><br />
                            We understand how festivals feel incomplete
                            when you are far from your loved ones.
                            <br /><br />
                            Through this seva, we try to make someone’s
                            festival brighter, lighter, and more meaningful.
                            <br /><br />
                            This is not charity.
                            <br />
                            This is gratitude.
                            <br />
                            This is devotion.
                        </p>
                    </div>

                </div>
            </section>

            {/* FESTIVAL HIGHLIGHTS */}
            <section className="festival-section">
                <div className="festival-container">

                    {/* LEFT CONTENT */}
                    <div className="festival-content">
                        <h2>Our Recent Seva</h2>

                        <p>
                            During Maha Shivratri, we prepared Kheer Prasad
                            with devotion and distributed it with humility.
                            <br /><br />
                            On Krishna Janmashtami, we shared sweetness
                            as a symbol of gratitude and celebration.
                            <br /><br />
                            Every seva is done with purity,
                            small-batch preparation,
                            and heartfelt intention.
                        </p>

                        <div className="festival-highlights">
                            <span>✔ Maha Shivratri Seva</span>
                            <span>✔ Krishna Janmashtami Distribution</span>
                            <span>✔ Sacred Festival Offerings</span>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="festival-image">
                        <img src="/images/donate3.png" alt="Recent Seva" />
                    </div>

                </div>
            </section>

            {/* IMAGE GALLERY */}
            <section className="donate-gallery">
                <h2>Moments From Our Seva</h2>
                <div className="gallery-grid">
                    <img src="/images/donate4.png" alt="Seva 1" />
                    <img src="/images/donate5.png" alt="Seva 2" />
                    <img src="/images/donate2.png" alt="Seva 3" />
                </div>
            </section>

            {/* DONATION SECTION */}
            <section className="donate-box">
                <h2>Contribute With Love</h2>

                <div className="quick-amounts">
                    {quickAmounts.map((amt) => (
                        <button key={amt} onClick={() => setAmount(amt)}>
                            ₹{amt}
                        </button>
                    ))}
                </div>

                <input
                    type="number"
                    placeholder="Enter custom amount (₹1 - ₹10,000)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    max="10000"
                />

                <button className="donate-btn" onClick={handleDonate}>
                    Proceed to Pay ₹{amount || "0"}
                </button>

                <div className="donate-note">
                    Even ₹1 given with pure intention carries immense value.
                </div>
            </section>

            {/* TRANSPARENCY */}
            <section className="donate-transparency">
                <h2>Our Transparency Promise</h2>
                <ul>
                    <li>✔ 100% amount used for festival seva</li>
                    <li>✔ No personal profit from contributions</li>
                    <li>✔ Real distribution during sacred occasions</li>
                    <li>✔ Photo & update transparency</li>
                    <li>✔ Every contribution respected equally</li>
                </ul>
            </section>

            {/* IMPACT MESSAGE */}
            <section className="impact-section">
                <h2>Your Contribution Creates Impact</h2>
                <p>
                    Your small contribution helps prepare prasad,
                    support distribution, and ensure that someone
                    experiences a festival with dignity and warmth.
                    <br /><br />
                    Together, we don’t just celebrate —
                    we uplift.
                </p>
            </section>

            {/* CONTACT */}
            <section className="donate-contact">
                <h3>Have questions or want to know more?</h3>
                <button onClick={() => navigate("/contact-us")}>
                    Contact Us
                </button>
            </section>

            <Footer />
        </>
    );
}

export default Donate;