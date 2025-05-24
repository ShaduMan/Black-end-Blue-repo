import React from "react";
import { useLocation } from "react-router-dom";
import "./StudentSeller.css"; // Optional for styling

const StudentSeller = () => {
  const { state } = useLocation(); // 👈 get passed data

  if (!state) {
    return <p>No product data available.</p>;
  }

  const { name, description, price, image } = state;

  return (
    <div className="blog-post" style={{ maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
      />
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Price:</strong> ${price.toFixed(2)}</p>
    </div>
  );
};

export default StudentSeller;
