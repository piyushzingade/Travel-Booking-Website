import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const BookingForm: React.FC = () => {
  const { state } = useLocation();
  const { pkg, selectedDate } = state || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: selectedDate || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.date) {
      alert("Please fill out all fields");
      return;
    }

    // Simulate form submission
    alert(`Booking submitted for ${form.name}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Booking Form for {pkg?.destination}
      </h2>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
