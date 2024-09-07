import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPackages } from "../services/api";

const PackageDetails: React.FC = () => {
  const { id } = useParams();
  const [pkg, setPackage] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    console.log("Package ID:", id); // Check if the correct id is logged

    const fetchData = async () => {
      try {
        const data = await getPackages(); // Fetch all packages (mocked or actual API)
        console.log("Fetched Data:", data); // Log the fetched data
        const selectedPackage = data.find((p: any) => p._id === id);
        if (selectedPackage) {
          setPackage(selectedPackage);
        } else {
          console.error("Package not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleBooking = () => {
    alert("Booked");
  };

  // Loading state
  if (!pkg) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row">
        {/* Package Image */}
        <div className="w-full lg:w-1/2 h-72 lg:h-auto overflow-hidden rounded-lg">
          <img
            src={pkg.imageUrl}
            alt={pkg.destination}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Package Details */}
        <div className="lg:pl-8 mt-4 lg:mt-0">
          <h2 className="text-3xl font-bold mb-4">{pkg.destination}</h2>
          <p className="mb-4">{pkg.description}</p>
          <p className="text-gray-600">Duration: {pkg.duration}</p>
          <p className="text-gray-600">Price: ${pkg.price}</p>
          <p className="text-gray-600">Rating: {pkg.rating} Stars</p>

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
            className="mt-4 bg-green-500 text-white p-2 rounded"
            disabled={!selectedDate} // Disable the button if no date is selected
          >
            Book Travel
          </button>
        </div>
      </div>
      {/* Back Button */}
      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Packages
        </Link>
      </div>
    </div>
  );
};

export default PackageDetails;
