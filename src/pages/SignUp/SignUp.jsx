import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    year: "",
    dob: "",
    phone: "",
    studentId: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email.endsWith(".edu")) {
      setError("Please use your university email address.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess("Signup simulated. Backend not connected.");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Student Sign Up</h2>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
          <input name="studentId" type="text" placeholder="Student ID" onChange={handleChange} required />
          <input name="email" type="email" placeholder="University Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
          <input name="department" type="text" placeholder="Department (e.g., CSE)" onChange={handleChange} />
          <input name="year" type="text" placeholder="Year of Study (e.g., 3rd)" onChange={handleChange} />
          <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} required />
          <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
