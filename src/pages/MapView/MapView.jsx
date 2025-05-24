import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './MapView.css';

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, watch: true, enableHighAccuracy: true })
      .on("locationfound", (e) => {
        setPosition(e.latlng);
        map.setView(e.latlng, 15);
      })
      .on("locationerror", () => {
        alert("Location access denied.");
      });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here 📍</Popup>
    </Marker>
  );
};

const MapView = () => {
  const navigate = useNavigate();

  return (
    <div className="map-view-page">
      <h2 className="map-title">📍 Find Your Location on Campus</h2>
      <p className="map-description">We use real-time geolocation to show your current position. This helps buyers and sellers plan campus meetups easily!</p>

      <div className="map-wrapper">
        <MapContainer center={[23.8103, 90.4125]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <LocationMarker />
        </MapContainer>
      </div>

      <div className="map-buttons">
        <button className="map-btn" onClick={() => navigate('/')}>🏠 Home</button>
        <button className="map-btn" onClick={() => navigate('/product')}>🛍️ Products</button>
      </div>
    </div>
  );
};

export default MapView;
