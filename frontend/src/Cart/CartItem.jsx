import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addItemsToCart,
  removeErrors,
  removeItemFromCart,
  removeMessage,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function CartItem({ item }) {
  const { success, loading, error, message } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Minimum quantity is 1", { position: "top-center" });
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("Cannot exceed available stock", { position: "top-center" });
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const handleUpdate = () => {
    if (quantity !== item.quantity) {
      dispatch(addItemsToCart({ id: item.product, quantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeItemFromCart(item.product));
    toast.success("Item removed from cart", { position: "top-center" });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  return (
    <div className="premium-cart-item">

      {/* IMAGE */}
      <div className="premium-item-image-wrapper">
        <img src={item.image} alt={item.name} className="premium-item-image" />
      </div>

      {/* DETAILS */}
      <div className="premium-item-details">
        <h3 className="premium-item-name">{item.name}</h3>

        <p className="premium-item-price">
          ₹{item.price.toFixed(2)}
        </p>

        {item.stock <= 5 && (
          <p className="stock-warning">
            ⚠ Only {item.stock} left in stock
          </p>
        )}

        {/* QUANTITY STEPPER */}
        <div className="premium-quantity-control">
          <button onClick={decreaseQuantity} disabled={loading}>−</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity} disabled={loading}>+</button>
        </div>

        {/* LIVE TOTAL */}
        <div className="premium-live-total">
          Item Total: ₹{(item.price * quantity).toFixed(2)}
        </div>

        {/* ACTIONS */}
        <div className="premium-actions">
          {quantity !== item.quantity && (
            <button
              className="premium-update-btn"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          )}

          <button
            className="premium-remove-btn"
            onClick={handleRemove}
            disabled={loading}
          >
            Remove
          </button>
        </div>

      </div>
    </div>
  );
}

export default CartItem;