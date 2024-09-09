import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BookingForm(){
  const { state } = useLocation();
  const { pkg, selectedDate } = state || {};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    startDate: selectedDate || "",
    endDate: "",
  });

  // Function to calculate the end date based on the start date and package duration
  const calculateEndDate = (startDate: string, duration: string) => {
    const start = new Date(startDate);
    const durationDays = parseInt(duration); // Convert duration string to number
    const end = new Date(start);
    end.setDate(start.getDate() + durationDays); // Add duration days to start date
    return end.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
  };

  // Update endDate whenever startDate or package duration changes
  useEffect(() => {
    if (form.startDate && pkg?.duration) {
      const durationInDays = parseInt(pkg.duration); // Extract the duration from the package (e.g., "6 days")
      const endDate = calculateEndDate(
        form.startDate,
        durationInDays.toString()
      );
      setForm((prevForm) => ({ ...prevForm, endDate }));
    }
  }, [form.startDate, pkg?.duration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.startDate || !form.endDate) {
      alert("Please fill out all fields");
      return;
    }

    // Simulate form submission
    alert(
      `Booking submitted for ${form.name} from ${form.startDate} to ${form.endDate}`
    );
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
          <label className="block">Phone no.</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
          <label className="block">Start Date</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">End Date</label>
          <input
            type="date"
            value={form.endDate}
            readOnly
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

