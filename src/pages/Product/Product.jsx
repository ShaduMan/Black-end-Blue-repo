import React from "react";
import { Link } from "react-router-dom";
import all_product from "../Assets/all_product";
import "./Product.css";

const ProductList = () => {
  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Clothing Products</h1>
      <div className="products-grid">
        {all_product.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">Category: {product.category}</p>
              <div>
                <span className="product-price">
                  ${product.new_price.toFixed(2)}
                </span>
                {product.old_price && (
                  <span className="product-old-price">
                    ${product.old_price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
