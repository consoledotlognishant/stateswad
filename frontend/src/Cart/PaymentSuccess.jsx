import React, { useEffect } from 'react'
import '../CartStyles/PaymentSuccess.css'
import { Link, useSearchParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PaymentSuccess() {

  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference');
  const type = searchParams.get('type');

  const isCOD = type === "cod";

  return (
    <>
      <PageTitle title="Order Status" />
      <Navbar />

      <div className="payment-success-container">

        <div className="success-content">

          <div className="receipt-box">

            <h1>{isCOD ? "Order Confirmed!" : "Payment Successful!"}</h1>

            <p>
              {isCOD
                ? "Your order has been placed with Cash On Delivery."
                : "Your payment was successful."
              }
            </p>

            <p>Reference ID: <strong>{reference}</strong></p>

            <hr />

            <h3>StateSwad by Nishant</h3>
            <p>Premium Homemade Delicacies</p>

          </div>

          <Link className='explore-btn' to="/orders/user">
            View My Orders
          </Link>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default PaymentSuccess