import React, { useEffect, useState } from 'react';
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { createReview, getProductDetails, removeErrors, removeSuccess, getProduct } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice';
import Product from '../components/Product';

function ProductDetails() {

    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");
    const [showAllReviews, setShowAllReviews] = useState(false);

    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, error, product, reviewSuccess, reviewLoading, products } =
        useSelector((state) => state.product);

    const { loading: cartLoading, error: cartError, success, message } =
        useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);

    const hasPurchased = product?.reviews?.some(
        (rev) => rev.user === user?._id
    );

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));
            dispatch(getProduct({ keyword: "" }));
        }
        return () => {
            dispatch(removeErrors());
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
        if (cartError) {
            toast.error(cartError, { position: 'top-center', autoClose: 3000 });
        }
    }, [dispatch, error, cartError]);

    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeMessage());
        }
    }, [dispatch, success, message]);

    const decreaseQuantity = () => {
        if (quantity <= 1) {
            toast.error('Quantity cannot be less than 1', { position: 'top-center', autoClose: 3000 });
            return;
        }
        setQuantity(qty => qty - 1);
    };

    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            toast.error('Cannot exceed available Stock!', { position: 'top-center', autoClose: 3000 });
            return;
        }
        setQuantity(qty => qty + 1);
    };

    const addToCart = () => {
        dispatch(addItemsToCart({ id, quantity }));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!userRating) {
            toast.error('Please Select a rating', { position: 'top-center', autoClose: 3000 });
            return;
        }
        dispatch(createReview({
            rating: userRating,
            comment,
            productId: id
        }));
    };

    useEffect(() => {
        if (reviewSuccess) {
            toast.success('Review Submitted Successfully', { position: 'top-center', autoClose: 3000 });
            setUserRating(0);
            setComment("");
            dispatch(removeSuccess());
            dispatch(getProductDetails(id));
        }
    }, [reviewSuccess, id, dispatch]);

    useEffect(() => {
        if (product && product.image && product.image.length > 0) {
            setSelectedImage(product.image[0].url);
        }
    }, [product]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Loader />
                <Footer />
            </>
        );
    }

    if (error || !product) {
        return (
            <>
                <PageTitle title="Product Details" />
                <Navbar />
                <Footer />
            </>
        );
    }

    return (
        <>
            <PageTitle title={`${product.name} - Details`} />
            <Navbar />

            <div className="product-details-container">
                <div className="product-detail-container">

                    <div className="product-image-container">
                        <img src={selectedImage} alt={product.name} className='product-detail-image' />

                        {product.image.length > 1 && (
                            <div className="product-thumbnails">
                                {product.image.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        className='thumbnail-image'
                                        onClick={() => setSelectedImage(img.url)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">Price : {product.price}/-</p>

                        <div className="product-rating">
                            <Rating value={product.ratings} disabled={true} />
                            <span className="productCardSpan">
                                ( {product.numOfReviews} {product.numOfReviews === 1 ? "Review" : "Reviews"} )
                            </span>
                        </div>

                        <div className="stock-status">
                            <span className={product.stock > 0 ? `in-stock` : 'out-of-stock'}>
                                {product.stock > 0
                                    ? `In Stock (${product.stock} available)`
                                    : 'Out of Stock'}
                            </span>
                        </div>

                        <div className="delivery-info">
                            <p>🚚 Fast Delivery Available</p>
                            <p>💵 Cash On Delivery Available</p>
                            <p>📦 Freshly Prepared After Order</p>
                        </div>

                        {product.stock > 0 && (
                            <>
                                <div className="quantity-controls">
                                    <span className="quantity-label">Quantity:</span>
                                    <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                                    <input type="text" value={quantity} className='quantity-value' readOnly />
                                    <button className="quantity-button" onClick={increaseQuantity}>+</button>
                                </div>

                                <button
                                    className="add-to-cart-btn"
                                    onClick={addToCart}
                                    disabled={cartLoading}
                                >
                                    {cartLoading ? 'Adding' : 'Add to Cart'}
                                </button>
                            </>
                        )}

                        {hasPurchased ? (
                            <form className="review-form" onSubmit={handleReviewSubmit}>
                                <h3>Write a Review</h3>
                                <Rating
                                    value={userRating}
                                    disabled={false}
                                    onRatingChange={setUserRating}
                                />
                                <textarea
                                    placeholder="Write your review here.."
                                    className="review-input"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                />
                                <button
                                    className="submit-review-btn"
                                    disabled={reviewLoading}
                                >
                                    {reviewLoading ? 'Submitting....' : 'Submit Review'}
                                </button>
                            </form>
                        ) : (
                            <div className="review-locked">
                                Purchase this product to leave a review.
                            </div>
                        )}
                    </div>
                </div>

                <div className="reviews-container">
                    <h3>Customer Reviews</h3>

                    {product.reviews && product.reviews.length > 0 ? (
                        <>
                            <div className="reviews-section">
                                {(showAllReviews
                                    ? product.reviews
                                    : product.reviews.slice(0, 3)
                                ).map((review, index) => (
                                    <div className="review-item" key={index}>
                                        <div className="review-header">
                                            <Rating value={review.rating} disabled={true} />
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                        <p className="review-name">By : {review.name}</p>
                                    </div>
                                ))}
                            </div>

                            {product.reviews.length > 3 && (
                                <button
                                    className="show-more-btn"
                                    onClick={() => setShowAllReviews(!showAllReviews)}
                                >
                                    {showAllReviews ? "Show Less" : "Show More Reviews"}
                                </button>
                            )}
                        </>
                    ) : (
                        <p className="no-reviews">
                            No reviews yet. Be the first to review this product!
                        </p>
                    )}
                </div>

                <div className="trending-products">
                    <h2>Trending Products</h2>
                    <div className="trending-grid">
                        {products && products.slice(0, 4).map((prod) => (
                            <Product product={prod} key={prod._id} />
                        ))}
                    </div>
                </div>

                <div className="running-ribbon">
                    <div className="ribbon-track">
                        <div className="ribbon-content">
                            ❤️ Made with love &nbsp; • &nbsp;
                            🔥 Freshly prepared &nbsp; • &nbsp;
                            🚚 Delivered with care &nbsp; • &nbsp;
                            🤝 From our family to yours &nbsp; • &nbsp;
                        </div>
                        <div className="ribbon-content">
                            ❤️ Made with love &nbsp; • &nbsp;
                            🔥 Freshly prepared &nbsp; • &nbsp;
                            🚚 Delivered with care &nbsp; • &nbsp;
                            🤝 From our family to yours &nbsp; • &nbsp;
                        </div>
                    </div>
                </div>

                <div className="donate-mini-block">
                    <h3>Support Our Festival Seva</h3>
                    <p>Help us spread sweetness during sacred festivals.</p>
                    <Link to="/donate" className="donate-mini-btn">
                        Contribute With Love
                    </Link>
                </div>

            </div>

            <Footer />
        </>
    );
}

export default ProductDetails;