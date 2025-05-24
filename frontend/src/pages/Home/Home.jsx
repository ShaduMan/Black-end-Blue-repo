import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate("/login");
  };

  const handleStudentAccessClick = () => {
    navigate("/login");
  };

  const handleProductListingsClick = () => {
    navigate("/product");
  };

  const handleSmartAIToolsClick = () => {
    navigate("/chatbot"); // <-- Route to your chatbot component
  };

  return (
    <div className="home-container">
      <main className="home-main">
        <h2>Buy, Sell & Connect <br />With Fellow Students 🎓</h2>
        <p>
          A student-only marketplace to exchange products and services with verified peers.
          No middleman. Just pure campus collaboration.
        </p>
        <div className="button-group">
          <button className="btn-outline">Explore Listings</button>
          <button className="btn-filled" onClick={handleJoinNow}>Join Now</button>
        </div>
      </main>

      <section id="features" className="features-section">
        <h3>Why CampusMarket?</h3>
        <div className="feature-boxes">
          {/* Student-Only Access feature */}
          <div
            className="feature"
            onClick={handleStudentAccessClick}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleStudentAccessClick();
            }}
          >
            <h4>🎓 Student-Only Access</h4>
            <p>Verify using your student ID and keep the community safe and exclusive.</p>
          </div>

          {/* Product Listings & Search feature */}
          <div
            className="feature"
            onClick={handleProductListingsClick}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleProductListingsClick();
            }}
          >
            <h4>🛍️ Product Listings & Search</h4>
            <p>Find, browse, and filter a wide range of student-posted products quickly and easily.</p>
          </div>

          {/* Smart AI Tools feature */}
          <div
            className="feature"
            onClick={handleSmartAIToolsClick}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSmartAIToolsClick();
            }}
          >
            <h4>🤖 Smart AI Tools</h4>
            <p>Use AI to estimate prices, get product suggestions, and ask our chatbot for help.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
