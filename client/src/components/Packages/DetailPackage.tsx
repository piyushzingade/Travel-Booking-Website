import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import react-hot-toast for notifications
import { getPackages } from "../../services/api"; // Import API service to fetch packages

export default function PackageDetails() {
  const { id } = useParams<string>(); // Get the package ID from URL parameters
  const [pkg, setPackage] = useState<any>(null); // State to hold package data
  const [selectedDate, setSelectedDate] = useState<string>(""); // State to hold selected date
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Fetch package details when component mounts or ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPackages(); // Fetch all packages from the API
        const selectedPackage = data.find((p: any) => p._id === id); // Find the package with the matching ID

        if (selectedPackage) {
          setPackage(selectedPackage); // Set package data in state
        } else {
          toast.error("Package not found"); // Notify if package is not found
        }
      } catch (error) {
        toast.error("Error fetching data"); // Notify on data fetch error
      }
    };

    fetchData(); // Call fetchData on component mount
  }, [id]);

  // Handle booking button click
  const handleBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a date before proceeding"); // Notify if no date selected
    } else {
      // Navigate to booking page with package and selected date as state
      navigate("/booking", { state: { pkg, selectedDate } });
      toast.success("Booking page loaded!"); // Notify successful navigation
    }
  };

  // Display a loading message while data is being fetched
  if (!pkg) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Home button */}
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-500 hover:underline font-semibold text-lg"
        >
          Home
        </Link>
      </div>

      {/* Package details container */}
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
}
