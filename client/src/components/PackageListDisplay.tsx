import { Link } from "react-router-dom";

interface TravelPackage {
  _id: string;
  destination: string;
  price: number;
  rating: number;
  duration: string;
  description1: string;
  imageUrl: string;
}

interface PackageListDisplayProps {
  packages: TravelPackage[];
}

export default function PackageListDisplay({
  packages,
}: PackageListDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div key={pkg._id} className="border p-4 rounded-lg shadow-lg">
          {/* Image Container with fixed aspect ratio */}
          <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-lg">
            <img
              src={pkg.imageUrl}
              alt={pkg.destination}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold">{pkg.destination}</h3>
            <p>{pkg.description1}</p>
            <p className="text-sm text-gray-600">Duration: {pkg.duration}</p>
            <p className="font-bold">Price: ${pkg.price}</p>
            <p>Rating: {pkg.rating} Stars</p>
            {/* Link to the Package Details page */}
            <Link to={`/packages/${pkg._id}`}>
              <button className="mt-4 bg-blue-500 text-white p-2 rounded">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
