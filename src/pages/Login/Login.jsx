import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../services/api"; // Uncomment when backend is ready
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // 👉 SIMULATED LOGIN
    if (formData.email === "student@university.edu" && formData.password === "password123") {
      setSuccess("Login simulated. Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setError("Invalid email or password.");
    }

    /*
    // 👉 REAL BACKEND INTEGRATION
    try {
      const res = await API.post("/auth/login", formData);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
    */
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Student Login</h2>

        {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-sm text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="University Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
