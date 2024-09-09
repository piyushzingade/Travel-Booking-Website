import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPackages } from "../services/api"; // Assuming you have a service to fetch packages

export default function PackageDetails () {
  const { id } = useParams(); // Get the package ID from the URL
  const [pkg, setPackage] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPackages(); // Fetch all packages from the backend API
        const selectedPackage = data.find((p: any) => p._id === id); // Find the package by ID
        if (selectedPackage) {
          setPackage(selectedPackage); // Set the package data in state
        } else {
          console.error("Package not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data on component mount
  }, [id]);

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a date before proceeding");
    } else {
      // Redirect to booking page
      navigate("/booking", { state: { pkg, selectedDate } });
    }
  };

  // Display loading message while data is being fetched
  if (!pkg) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Move "Home" button outside the image and details container */}
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-500 hover:underline font-semibold text-lg"
        >
          Home
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side: Image */}
        <div className="w-full lg:w-1/2 h-96 overflow-hidden">
          <img
            src={pkg.imageUrl}
            alt={pkg.destination}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side: Details */}
        <div className="p-6 lg:p-8 lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">{pkg.destination}</h2>
            <p className="text-gray-700 text-lg mb-4">{pkg.description1}</p>
            <p className="text-gray-700 text-lg mb-4">{pkg.description2}</p>
            <p className="text-gray-500 text-lg mb-2">
              <span className="font-semibold">Duration:</span> {pkg.duration}
            </p>
            <p className="text-gray-500 text-lg mb-2">
              <span className="font-semibold">Price:</span> ${pkg.price}
            </p>
            <p className="text-gray-500 text-lg mb-2">
              <span className="font-semibold">Rating:</span> {pkg.rating} Stars
            </p>
          </div>

          {/* Date Picker */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          {/* Book Travel Button */}
          <button
            onClick={handleBooking}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-lg"
          >
            Book Travel
          </button>
        </div>
      </div>
    </div>
  );
};


