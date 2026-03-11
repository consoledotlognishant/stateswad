import React, { useState } from 'react';
import '../CartStyles/Payment.css'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrder } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

function Payment() {

  const orderItem = JSON.parse(sessionStorage.getItem('orderItem'));
  const { user } = useSelector(state => state.user)
  const { shippingInfo, cartItems } = useSelector(state => state.cart)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false)

  const createCODOrder = async () => {
    try {
      setProcessing(true)

      const orderData = {
        shippingInfo: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,
          pinCode: shippingInfo.pinCode,
          phoneNo: shippingInfo.phoneNumber
        },
        orderItems: cartItems,
        paymentInfo: {
          id: "COD_" + Date.now(),
          status: "pending"
        },
        paymentMethod: "Cash On Delivery",
        itemPrice: orderItem.subtotal,
        shippingPrice: orderItem.shippingCharges,
        totalPrice: orderItem.total,
        orderStatus: "Processing"
      }

      await dispatch(createOrder(orderData))
      dispatch(clearCart())
      sessionStorage.removeItem("orderItem")

      navigate(`/paymentSuccess?type=cod&reference=${orderData.paymentInfo.id}`)

    } catch (error) {
      toast.error("COD Order Failed")
    } finally {
      setProcessing(false)
    }
  }

  const completeOnlinePayment = async (amount) => {
    try {
      setProcessing(true)

      const { data: keyData } = await API.get('/getKey');
      const { key } = keyData;

      const { data: orderData } = await API.post('/payment/process', { amount });
      const { order } = orderData

      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'StateSwad by Nishant',
        description: 'Premium Homemade Delicacies',
        order_id: order.id,

        handler: async function (response) {

          navigate(`/paymentSuccess?type=online&reference=${response.razorpay_payment_id}`)
        },

        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNumber
        },

        theme: { color: '#d4af37' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error("Payment Failed")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      <PageTitle title="Payment" />
      <Navbar />
      <CheckoutPath activePath={2} />

      <div className="premium-payment-wrapper">

        <div className="premium-payment-card">

          <h2>Select Payment Method</h2>

          <div className="payment-total-box">
            Total Payable: ₹{orderItem.total}
          </div>

          <button
            className="premium-pay-btn"
            onClick={() => completeOnlinePayment(orderItem.total)}
            disabled={processing}
          >
            💳 Pay Online
          </button>
          <br />
          <button
            className="premium-pay-btn"
            onClick={createCODOrder}
            disabled={processing}
          >
            🚚 Cash On Delivery
          </button>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Payment