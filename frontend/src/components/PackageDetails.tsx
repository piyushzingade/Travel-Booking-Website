// components/PackageDetails.tsx
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
      <h1>{pkg.destination}</h1>
      <p>{pkg.description}</p>
      <p>Price: ${pkg.price}</p>
      <p>Rating: {pkg.rating}</p>
      <p>Duration: {pkg.duration}</p>
    </div>
  );
};

export default PackageDetails;
