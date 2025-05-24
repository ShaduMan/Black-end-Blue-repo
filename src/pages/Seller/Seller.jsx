import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Seller.css";

const Seller = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: "Fetching address...",
  });

  const navigate = useNavigate();

  // Get user's coordinates on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setLocation((loc) => ({
          ...loc,
          latitude: lat,
          longitude: lon,
        }));

        // Call reverse geocoding API to get address
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.address) {
              const { city, town, village, road, state, country } = data.address;
              // Compose a readable address
              const addr = [
                road,
                city || town || village,
                state,
                country,
              ]
                .filter(Boolean)
                .join(", ");

              setLocation((loc) => ({
                ...loc,
                address: addr || "Address not found",
              }));
            } else {
              setLocation((loc) => ({
                ...loc,
                address: "Address not found",
              }));
            }
          })
          .catch(() => {
            setLocation((loc) => ({
              ...loc,
              address: "Failed to fetch address",
            }));
          });
      },
      (err) => {
        console.error("Location access denied:", err);
        setLocation((loc) => ({
          ...loc,
          address: "Location permission denied",
        }));
      }
    );
  }, []);

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
      location,
    };

    if (onAddProduct) {
      onAddProduct(newProduct);
    }

    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
    setPreview(null);

    navigate("/studentseller");
  };

  return (
    <div className="page-wrapper">
      <div className="seller-container">
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

          <div className="description-location-wrapper">
            <label className="description-field">
              Description:
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>

            <div className="location-box">
              <h3>Your Location</h3>
              {location.latitude && location.longitude ? (
                <>
                  <p>{location.address}</p>
                  <MapContainer
                    center={[location.latitude, location.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "180px", width: "100%", borderRadius: "8px" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    />
                    <Marker position={[location.latitude, location.longitude]}>
                      <Popup>Your location</Popup>
                    </Marker>
                  </MapContainer>
                </>
              ) : (
                <p>Fetching location...</p>
              )}
            </div>
          </div>

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
            <img src={preview} alt="Preview" className="preview-image" />
          )}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Seller;
