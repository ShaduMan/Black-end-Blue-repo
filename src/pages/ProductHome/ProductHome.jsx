import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductHome.css";
import Pc_components from "../Assets/pc.jpeg";
import Laptop from "../Assets/images.jpeg";
import Mobile from "../Assets/mobile.jpeg";
import product_1 from "../Assets/p1_product_i1.png";
import product_2 from "../Assets/p1_product_i2.png";
import product_3 from "../Assets/p1_product_i3.png";

const products = {
  "Cloth Components": [
    { name: "T-Shirt", img: product_1 },
    { name: "T-Shirt", img: product_2 },
    { name: "T-Shirt", img: product_3 },
  ],
  "PC Components": [
    { name: "Graphics Card", img: Pc_components },
    { name: "Graphics Card", img: Pc_components },
    { name: "Graphics Card", img: Pc_components },
  ],
  "Laptop Components": [
    { name: "Laptop", img: Laptop },
    { name: "Laptop", img: Laptop },
    { name: "Laptop SSD", img: Laptop },
  ],
  "Mobile Components": [
    { name: "Mobile Phone", img: Mobile },
    { name: "Mobile Phone", img: Mobile },
    { name: "Mobile Phone", img: Mobile },
  ],
};

const ProductHome = () => {
  const navigate = useNavigate();

  const handleSellClick = () => {
    navigate("/seller");
  };

  return (
    <div className="product-container">
      <h1 className="title">Explore Categories</h1>

      {/* Sell Item Section */}
      <div
        className="sell-item-section"
        onClick={handleSellClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleSellClick();
        }}
        style={{ cursor: "pointer" }}
      >
        <h2>📤 Want to Sell an Item?</h2>
        <p>Post a photo, name, description, and expected price — it's quick and easy!</p>
        <button className="sell-btn">Go to Seller Page</button>
      </div>

      {/* Existing Product Sections */}
      {Object.entries(products).map(([category, items]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="product-grid">
            {items.map((item, index) => (
              <Link
                key={index}
                to={`/product/${encodeURIComponent(category)}/${encodeURIComponent(item.name)}`}
                className="product-link"
              >
                <div className="product-card">
                  <img src={item.img} alt={item.name} className="product-image" />
                  <h3 className="product-name">{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductHome;
