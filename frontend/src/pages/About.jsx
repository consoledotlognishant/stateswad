import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pageStyles/About.css";

function About() {
    return (
        <>
            <Navbar />

            {/* ===== PREMIUM HEADER ===== */}
            <section className="about-header">
                <h1>OUR STORY</h1>
                <p>From distance and homesickness… to tradition delivered.</p>
            </section>

            {/* ===== FOUNDER MAIN ===== */}
            <section className="founder-main">
                <img
                    src="/images/admin.png"
                    alt="Founder"
                    className="founder-main-img"
                />

                <h2>Nishant kumar</h2>
                <span className="founder-role">Founder • Vision & Technology</span>

                <p className="founder-main-p">
                    Hello everyone, I’m Nishant — a Bihar-born engineering student studying in Odisha.
                    <br /><br />
                    Living away from home, I deeply missed the warmth of my mother’s handmade
                    Thekuwa, Gujiya, and Nimki.
                    <br /><br />
                    What began as simple homesickness slowly turned into a mission —
                    to bring authentic homemade taste to everyone living away from home.
                </p>

                <div className="founder-buttons">
                    <a href="https://portfolio-ten-green-45.vercel.app/" target="_blank" rel="noreferrer">
                        View Portfolio
                    </a>
                    <a href="https://www.linkedin.com/in/nishant-kumar-4543a033b/" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </div>
            </section>

            {/* ===== CO FOUNDERS ===== */}
            <section className="cofounders-section">
                <div className="cofounder">
                    <img src="/images/image.png" className="founder-main-img" alt="Ashutosh Nayak" />
                    <h3>Ashutosh Nayak</h3>
                    <span className="founder-role">Co-Founder • Growth & Operations</span>
                    <p>
                        Focused on scaling the brand while preserving authenticity and
                        traditional preparation methods.
                    </p>
                    <a href="https://www.linkedin.com/in/ashutoshnayak101/" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </div>

                <div className="cofounder">
                    <img src="/images/image2.png" className="founder-main-img" alt="Chandan Beura" />
                    <h3>Chandan Beura</h3>
                    <span className="founder-role">Co-Founder • Market Analysis & Quality</span>
                    <p>
                        Ensures hygiene, quality control, and safe premium packaging
                        so every product reaches fresh and intact.
                    </p>
                    <a href="https://www.linkedin.com/in/chandan-beura-624618327/" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </div>
            </section>

            {/* ===== STRONG STORY ===== */}
            <section className="story-section">
                <h2>Born From Homesickness</h2>
                <p>
                    It began in a classroom. While others were thinking about code,
                    we were thinking about our mothers’ kitchens.
                    <br /><br />
                    The aroma of fresh ghee. The sweetness of festival Gujiya.
                    The comfort of evening snacks made with love.
                    <br /><br />
                    We realized — people don’t miss sweets.
                    They miss home.
                    <br /><br />
                    So we decided:
                    We first make it for you.
                    Then we pack it.
                    Then we deliver it fresh.
                </p>
            </section>

            {/* ===== RUNNING RIBBON TRAIN ===== */}
            <section className="ribbon-wrapper">
                <div className="ribbon-track">
                    <span>✨ Made Fresh After Order</span>
                    <span>🤝 From Our Family To Yours</span>
                    <span>❤️ Crafted With Love</span>
                    <span>🔥 Traditional Recipes</span>
                    <span>🚚 Carefully Packed</span>
                    <span>🌿 100% Pure Ingredients</span>
                </div>
            </section>

            {/* ===== OUR PROMISE ===== */}
            <section className="promise-section">
                <h2>Our Promise</h2>
                <ul>
                    <li>✔ 100% Homemade Style</li>
                    <li>✔ No Preservatives</li>
                    <li>✔ Pure Ghee & Traditional Spices</li>
                    <li>✔ Small-Batch Preparation</li>
                    <li>✔ Made Only After You Order</li>
                    <li>✔ Hygienic & Safe Packaging</li>
                </ul>
            </section>

            {/* ===== WHY WE EXIST ===== */}
            <section className="why-section">
                <h2>Why We Exist</h2>
                <p>
                    We exist for students living far from home.
                    For professionals working in other states.
                    For anyone who misses “maa ke haath ka swaad.”
                    <br /><br />
                    We don’t just make sweets.
                    We recreate memories.
                    We deliver comfort.
                    We send a piece of home.
                </p>
            </section>

            <Footer />
        </>
    );
}

export default About;