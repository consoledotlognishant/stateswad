import React from 'react';
import { Phone, Mail, GitHub, LinkedIn, YouTube, Instagram } from '@mui/icons-material'
import '../componentStyles/Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Section1 */}
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p><Phone fontSize='small' />Phone : +91 6205003458</p>
                    <p><Mail fontSize='small' />Email : nishantkumar6205003458@gmail.com</p>
                </div>

                {/* Section2 */}
                <div className="footer-section social">
                    <h3>Follow me</h3>
                    <div className="social-links">
                        <a href="https://github.com/consoledotlognishant" target="_blank">
                            <GitHub className='social-icon' />
                        </a>
                        <a href="https://www.linkedin.com/in/nishant-kumar-4543a033b/" target="_blank">
                            <LinkedIn className='social-icon' />
                        </a>

                    </div>
                </div>

                {/* Section3 */}
                <div className="footer-section about">
                    <h3>About</h3>
                    <p>State Swad was created to share authentic flavors and the warmth of tradition with every home.
                        Founded by<a href='https://portfolio-ten-green-45.vercel.app/'> Nishant Kumar </a>, it’s a brand built on love and unforgettable taste. ❤️✨</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 State Swad . All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer
