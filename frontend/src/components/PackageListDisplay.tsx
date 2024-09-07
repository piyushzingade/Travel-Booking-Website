// src/components/PackageListDisplay.tsx


interface TravelPackage {
  _id: string;
  destination: string;
  price: number;
  rating: number;
  duration: string;
  description: string;
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
          <img
            src={pkg.imageUrl}
            alt={pkg.destination}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">{pkg.destination}</h3>
            <p>{pkg.description}</p>
            <p className="text-sm text-gray-600">Duration: {pkg.duration}</p>
            <p className="font-bold">Price: ${pkg.price}</p>
            <p>Rating: {pkg.rating} Stars</p>
            <button className="mt-4 bg-blue-500 text-white p-2 rounded">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
