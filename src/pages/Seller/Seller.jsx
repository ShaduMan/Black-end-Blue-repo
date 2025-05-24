import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this
import "./Seller.css";

const Seller = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate(); // ✅ Create navigate function

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price),
      image,
    };

    if (onAddProduct) {
      onAddProduct(newProduct);
    } else {
      console.log("New product:", newProduct);
    }

    // Clear form
    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
    setPreview(null);

    // ✅ Navigate to /studentseller route
    navigate("/studentseller");
  };

  return (
    <div className="seller-container" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Sell a Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Price (USD):
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <button type="submit" style={{ marginTop: "15px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Seller;
