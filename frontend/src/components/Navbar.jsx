import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import '../componentStyles/Navbar.css';
import { useSelector } from 'react-redux';

import UserDashboard from "../components/UserDashboard";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const { isAuthenticated, user } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
        } else {
            navigate(`/products`)
        }
        setSearchQuery("")
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <div className="navbar-logo">
                    <Link to="/">STATE SWAD</Link>
                </div>

                <div className={`navbar-links ${isMenuOpen ? 'active' : ""}`}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/contact-us">Contact</Link></li>
                        <li><Link to="/donate">Donate</Link></li>
                    </ul>
                </div>

                <div className="navbar-icons">

                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">
                            <SearchIcon />
                        </button>
                    </form>

                    <div className="cart-container">
                        <Link to="/cart">
                            <ShoppingCartIcon className="icon" />
                            <span className="cart-badge">{cartItems.length}</span>
                        </Link>
                    </div>

                    {isAuthenticated ? (
                        <UserDashboard user={user} />
                    ) : (
                        <Link to="/register">
                            <PersonAddIcon className="icon" />
                        </Link>
                    )}

                    <div className="navbar-hamburger" onClick={toggleMenu}>
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;