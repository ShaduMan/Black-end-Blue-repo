import React, { useState } from "react";
import './Apply.css'
const CampusAmbassadorForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    year: "",
    motivation: "",
    cgpa: "",
    passingYear: "",
    dept: "",
    studentId: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Application submitted successfully!");
    // Replace with API call to save data
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Campus Ambassador Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">University</label>
          <input
            type="text"
            name="university"
            value={form.university}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Year of Study</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Department</label>
          <input
            type="text"
            name="dept"
            value={form.dept}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">CGPA</label>
          <input
            type="number"
            name="cgpa"
            step="0.01"
            min="0"
            max="4"
            value={form.cgpa}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Expected Passing Year</label>
          <input
            type="text"
            name="passingYear"
            value={form.passingYear}
            onChange={handleChange}
            placeholder="e.g. 2026"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">What motivates you?</label>
          <textarea
            name="motivation"
            value={form.motivation}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded h-24"
          />
        </div>

        <div>
          <label className="block font-semibold">Why do you want to apply for this position?</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded h-24"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default CampusAmbassadorForm;
