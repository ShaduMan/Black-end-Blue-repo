import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../services/api"; // 👉 Uncomment this when backend is ready
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

    // Validate email
    if (!formData.email.endsWith(".edu")) {
      setError("Please use your university email address.");
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // 👉 SIMULATED SIGNUP (for now)
    setSuccess("Signup simulated. Backend not connected.");
    setTimeout(() => navigate("/login"), 1500);

    /* 
    // 👉 REAL BACKEND INTEGRATION (uncomment this when backend is ready)
    try {
      const res = await API.post("/auth/signup", formData);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
    */
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Student Sign Up</h2>

        {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-sm text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="University Email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            name="department"
            type="text"
            placeholder="Department (optional)"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />
          <input
            name="year"
            type="text"
            placeholder="Year of Study (e.g., 3rd)"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
