import React from "react";

const StudentSeller = ({ products }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Uploaded Products</h2>
      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>${product.price.toFixed(2)}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSeller;
