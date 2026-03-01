import React from 'react'
import '../CartStyles/Cart.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {

    const { cartItems } = useSelector(state => state.cart)

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const platformCharge = 2
    const shippingCharges = subtotal > 500 ? 0 : 50
    const total = subtotal + platformCharge + shippingCharges

    const navigate = useNavigate()

    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`)
    }

    return (
        <>
            <Navbar />
            <PageTitle title="Your Cart" />

            {/* MOVING RIBBON */}
            <div className="cart-ribbon">
                <div className="ribbon-track">
                    <div className="ribbon-content">
                        🚚 Freshly Prepared • 💛 Made With Love • 🎁 Premium Packaging • 🔥 Small Batch Crafted •
                    </div>
                    <div className="ribbon-content">
                        🚚 Freshly Prepared • 💛 Made With Love • 🎁 Premium Packaging • 🔥 Small Batch Crafted •
                    </div>
                </div>
            </div>

            {cartItems.length === 0 ? (
                <div className="premium-empty-cart">
                    <h2>Your Cart Feels Lonely 😔</h2>
                    <p>Add something sweet and bring happiness home.</p>
                    <Link to="/products" className="premium-btn">Explore Products</Link>
                </div>
            ) : (
                <div className="premium-cart-container">

                    {/* CART ITEMS */}
                    <div className="premium-cart-items">
                        <h2 className="premium-heading">Your Selections</h2>

                        {cartItems.map(item =>
                            <CartItem item={item} key={item.name} />
                        )}

                        <Link to="/products" className="continue-shopping">
                            ← Continue Shopping
                        </Link>
                    </div>

                    {/* PRICE SUMMARY */}
                    <div className="premium-price-summary">

                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="summary-row">
                            <span>Platform Charge</span>
                            <span>₹{platformCharge}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{shippingCharges === 0 ? "Free" : `₹${shippingCharges}`}</span>
                        </div>

                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        {subtotal > 500 && (
                            <p className="free-shipping-note">
                                🎉 You unlocked Free Shipping!
                            </p>
                        )}

                        <button className="premium-checkout-btn" onClick={checkoutHandler}>
                            Secure Checkout
                        </button>

                        <div className="delivery-note">
                            Estimated Delivery: 3-5 Working Days
                        </div>

                    </div>
                </div>
            )}

            {/* DONATE BLOCK */}
            <div className="cart-donate-block">
                <h3>Support Our Festival Seva</h3>
                <p>Help us spread sweetness during sacred festivals.</p>
                <Link to="/donate" className="premium-btn">
                    Contribute With Love
                </Link>
            </div>

            <Footer />
        </>
    )
}

export default Cart