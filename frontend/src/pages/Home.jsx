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

          <div className="home-container">
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

          <Footer />
        </>
      )}
    </>
  );
}

export default Home;