import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import all_product from "../Assets/all_product";
import { useCart } from "../CartContext/CartContext";  // <-- import useCart hook
import "./Product.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();  // <-- get addToCart from context

  // Find the product by id (id is string, convert to string for comparison)
  const product = all_product.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Product not found!</h2>
        <button onClick={() => navigate("/product")}>Back to Products</button>
      </div>
    );
  }

  // Fallback description with product.name dynamically injected
  const fallbackDescription = `
    Discover the perfect blend of style and functionality with this premium ${product.name}. Crafted with high-quality materials, it offers unmatched durability and comfort for everyday use. Whether you're looking to upgrade your essentials or find a thoughtful gift, this product delivers exceptional value and performance.

    Featuring a sleek design and versatile features, ${product.name} fits seamlessly into your lifestyle — from casual outings to professional settings. Enjoy its user-friendly interface and thoughtful details that make every interaction effortless and enjoyable.

    Don’t miss out on owning this must-have item that combines innovation, elegance, and reliability. Experience the difference today and elevate your daily routine with ${product.name}.
  `;

  // Handler for Buy button
  const handleBuyNow = () => {
    addToCart(product);     // Add product to cart
    navigate("/cart");      // Redirect to cart page after adding
  };

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate("/product")}>
        &larr; Back to Products
      </button>

      <div className="product-details-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-details-image"
        />

        <div className="product-details-info">
          <h1>{product.name}</h1>
          <p className="category">Category: {product.category}</p>
          <p className="price">
            Price: ${product.new_price.toFixed(2)}{" "}
            {product.old_price && (
              <span className="old-price">${product.old_price.toFixed(2)}</span>
            )}
          </p>
          <p className="description">
            {product.description || fallbackDescription}
          </p>
          <button className="buy-button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
