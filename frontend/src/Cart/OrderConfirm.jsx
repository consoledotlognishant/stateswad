import React from 'react';
import '../CartStyles/OrderConfirm.css'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import CheckoutPath from './CheckoutPath';
import { useNavigate } from 'react-router-dom';

function OrderConfirm() {

  const { shippingInfo, cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user)

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const platformCharge = 2
  const shippingCharges = subtotal > 500 ? 0 : 50
  const total = subtotal + platformCharge + shippingCharges

  const navigate = useNavigate()

  const proceedToPayment = () => {
    const data = {
      subtotal,
      platformCharge,
      shippingCharges,
      total
    }
    sessionStorage.setItem('orderItem', JSON.stringify(data));
    navigate('/process/payment')
  }

  return (
    <>
      <PageTitle title="Confirm Order" />
      <Navbar />
      <CheckoutPath activePath={1} />

      <div className="premium-confirm-wrapper">

        {/* SHIPPING CARD */}
        <div className="premium-card">
          <h2>Shipping Details</h2>
          <div className="shipping-info-grid">
            <div>
              <p className="label">Name</p>
              <p>{user.name}</p>
            </div>
            <div>
              <p className="label">Phone</p>
              <p>{shippingInfo.phoneNumber}</p>
            </div>
            <div className="full-width">
              <p className="label">Address</p>
              <p>
                {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pinCode}
              </p>
            </div>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate('/shipping')}
          >
            ← Edit Shipping
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="premium-card">
          <h2>Your Items</h2>

          {cartItems.map((item) => (
            <div className="confirm-item" key={item.product}>

              <img
                src={item.image}
                alt={item.name}
                className="confirm-item-img"
              />

              <div className="confirm-item-details">
                <h4>{item.name}</h4>
                <p>₹{item.price} × {item.quantity}</p>
              </div>

              <div className="confirm-item-total">
                ₹{item.price * item.quantity}
              </div>

            </div>
          ))}

        </div>

        {/* SUMMARY */}
        <div className="premium-card summary-card">
          <h2>Order Summary</h2>

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
            <span>Total Payable</span>
            <span>₹{total}</span>
          </div>

          <div className="delivery-estimate">
            🚚 Estimated Delivery: 3-5 Working Days
          </div>

          <button
            className="premium-proceed-btn"
            onClick={proceedToPayment}
          >
            Secure Payment →
          </button>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default OrderConfirm