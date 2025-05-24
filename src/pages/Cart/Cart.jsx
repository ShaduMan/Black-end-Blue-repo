import React from "react";
import { useCart } from "../CartContext/CartContext";
// Make sure you have CartContext or replace with your own state management
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button className="back-button" onClick={() => navigate("/product")}>
          Browse Products
        </button>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.new_price, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-category">Category: {item.category}</p>
              <p className="cart-item-price">${item.new_price.toFixed(2)}</p>
            </div>
            <button
              className="remove-button"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button
          className="checkout-button"
          onClick={() => alert("Checkout coming soon!")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
