import React, { useEffect } from "react";
import "../pageStyles/Home.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    products = [], // ✅ SAFE DEFAULT VALUE
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct({ keyword: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Home-StateSwad" />
          <Navbar />
          <ImageSlider />
          <div className="running-ribbon">
            <div className="ribbon-track">

              <div className="ribbon-content">
                ❤️ Made with love in our kitchen &nbsp;&nbsp; • &nbsp;&nbsp;
                🔥 Freshly prepared after your order &nbsp;&nbsp; • &nbsp;&nbsp;
                🚚 Carefully packed & delivered to your doorstep &nbsp;&nbsp; • &nbsp;&nbsp;
                🤝 From our family to yours &nbsp;&nbsp; • &nbsp;&nbsp;
              </div>

              {/* Duplicate for smooth infinite loop */}
              <div className="ribbon-content">
                ❤️ Made with love in our kitchen &nbsp;&nbsp; • &nbsp;&nbsp;
                🔥 Freshly prepared after your order &nbsp;&nbsp; • &nbsp;&nbsp;
                🚚 Carefully packed & delivered to your doorstep &nbsp;&nbsp; • &nbsp;&nbsp;
                🤝 From our family to yours &nbsp;&nbsp; • &nbsp;&nbsp;
              </div>

            </div>
          </div>

          <div className="home-container">
            {/* ===== Categories Section ===== */}
            <div className="category-section">
              <h2 className="home-heading">Categories</h2>



              <div className="category-container">

                <Link to="/products?category=Sweets" className="category-item">
                  <div className="category-image">
                    <img src="/images/sweets.png" alt="Sweets" />
                  </div>
                  <h3>Sweets</h3>
                </Link>

                <Link to="/products?category=DryFruits" className="category-item">
                  <div className="category-image">
                    <img src="/images/dry.jpg" alt="Dry Fruits" />
                  </div>
                  <h3>Dry Fruits</h3>
                </Link>

                <Link to="/products?category=Prasad" className="category-item">
                  <div className="category-image">
                    <img src="/images/prasad.jpg" alt="Prasad" />
                  </div>
                  <h3>Prasad</h3>
                </Link>

                <Link to="/products?category=Mixture" className="category-item">
                  <div className="category-image">
                    <img src="/images/mix.webp" alt="Mixture" />
                  </div>
                  <h3>Mixture</h3>
                </Link>

                <Link to="/products?category=StateSpecial" className="category-item">
                  <div className="category-image">
                    <img src="/images/sweets2.jpg" alt="State Special" />
                  </div>
                  <h3>State Special</h3>
                </Link>

                <Link to="/products?category=KhastaMeal" className="category-item">
                  <div className="category-image">
                    <img src="/images/khasta.webp" alt="Khasta Meal" />
                  </div>
                  <h3>Khasta Meal</h3>
                </Link>

                <Link to="/products?category=GiftBox" className="category-item">
                  <div className="category-image">
                    <img src="/images/gift.webp" alt="Gift Box" />
                  </div>
                  <h3>Gift Box</h3>
                </Link>

              </div>


            </div>

            {/* ===== Signature Creations Section ===== */}
            <div className="signature-section">

              <div className="signature-header">
                <div className="signature-icon">❦</div>
                <h2>Signature Creations</h2>
                <p>Handcrafted delicacies loved for their authenticity and unforgettable taste.</p>
              </div>

              <div className="signature-grid">

                <div className="signature-card">
                  <img src="./images/khaja.jpg" alt="Bobbatlu" />
                  <div className="signature-overlay">
                    <h3>KHAJA</h3>
                    <p>Every bite carries the warmth of home.</p>
                  </div>
                </div>

                <div className="signature-card">
                  <img src="./images/thekua.png" alt="Kalakand" />
                  <div className="signature-overlay">
                    <h3>THEKUWA</h3>
                    <p>MAKE YOUR DAY VERY TASTY.</p>
                  </div>
                </div>

                <div className="signature-card">
                  <img src="/images/gujiya.jpg" alt="Kaju Pakoda" />
                  <div className="signature-overlay">
                    <h3>GUJIYA</h3>
                    <p>Crunch that keeps you coming back.</p>
                  </div>
                </div>

              </div>
            </div>

            <h2 className="home-heading">Trending Now</h2>
            <div className="home-product-container">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Product
                    product={product}
                    key={product._id}
                  />
                ))
              ) : (
                <p style={{ textAlign: "center" }}>
                  No products available
                </p>
              )}
            </div>
          </div>
          <div className="heritage-section">

            <div className="heritage-content">

              <h2>
                FROM OUR GRANDMOTHER’S KITCHEN <br />
                TO YOUR DOORSTEP
              </h2>

              <p>
                We begin only after you choose.<br />
                Slowly prepared with age-old recipes,<br />
                lovingly handcrafted with patience,<br />
                carefully packed,<br />
                and delivered fresh — just for you.
              </p>

              <div className="heritage-tagline">
                Because true sweetness is never stored… it is made with heart.
              </div>

            </div>

          </div>
          <div className="promo-section">

            <div className="promo-image">
              <img src="/images/Gujiya2.jpg" alt="Fresh Sweets" />
            </div>

            <div className="promo-content">
              <h2>
                ORDER NOW & ENJOY<br />
                SPECIAL LIVE DISCOUNTS
              </h2>

              <p>
                Every sweet is freshly prepared with love and devotion —
                made just for you and delivered with warmth from our kitchen to your home.
              </p>

              <a href="/products" className="promo-btn">
                ORDER NOW
              </a>
            </div>

          </div>


          <Footer />
        </>
      )}
    </>
  );
}

export default Home;