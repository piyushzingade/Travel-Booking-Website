import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPackages } from "../services/api";

const PackageDetails: React.FC = () => {
  const { id } = useParams();
  const [pkg, setPackage] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPackages();
      const selectedPackage = data.find((p: any) => p._id === id);
      setPackage(selectedPackage);
    };
    fetchData();
  }, [id]);

  if (!pkg) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{pkg.destination}</h1>
      <img
        src={pkg.imageUrl}
        alt={pkg.destination}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <p className="text-lg">{pkg.description}</p>
      <p className="text-xl font-bold mt-4">Price: ${pkg.price}</p>
      <p className="text-lg">Rating: {pkg.rating} Stars</p>
      <p className="text-lg">Duration: {pkg.duration}</p>
    </div>
  );
};

export default PackageDetails;
