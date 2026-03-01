import React, { useState } from "react";
import "../CartStyles/Shipping.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Shipping() {

  const { shippingInfo } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [city, setCity] = useState(shippingInfo.city || "");

  const shippingInfoSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      toast.error("Invalid Phone number! It should be 10 digits", { position: "top-center" });
      return;
    }

    if (!address || !pinCode || !country || !state || !city) {
      toast.error("Please fill all required fields", { position: "top-center" });
      return;
    }

    dispatch(saveShippingInfo({ address, pinCode, phoneNumber, country, state, city }));
    navigate("/order/confirm");
  };

  return (
    <>
      <PageTitle title="Shipping Details" />
      <Navbar />
      <CheckoutPath activePath={0} />

      <div className="premium-shipping-wrapper">

        <div className="premium-shipping-card">

          <div className="shipping-header">
            <h2>Delivery Information</h2>
            <button
              type="button"
              className="back-to-cart-btn"
              onClick={() => navigate("/cart")}
            >
              ← Back to Cart
            </button>
          </div>

          <form className="premium-shipping-form" onSubmit={shippingInfoSubmit}>

            {/* ADDRESS */}
            <div className="form-group">
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label>Full Address</label>
            </div>

            {/* PINCODE */}
            <div className="form-group">
              <input
                type="number"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
              <label>Pin Code</label>
            </div>

            {/* PHONE */}
            <div className="form-group">
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label>Phone Number</label>
            </div>

            {/* COUNTRY */}
            <div className="form-group">
              <select
                required
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState("");
                  setCity("");
                }}
              >
                <option value=""></option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label>Country</label>
            </div>

            {/* STATE */}
            {country && (
              <div className="form-group">
                <select
                  required
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("");
                  }}
                >
                  <option value=""></option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <label>State</label>
              </div>
            )}

            {/* CITY */}
            {state && (
              <div className="form-group">
                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value=""></option>
                  {City.getCitiesOfState(country, state).map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <label>City</label>
              </div>
            )}

            <button type="submit" className="premium-submit-btn">
              Continue to Confirm →
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shipping;