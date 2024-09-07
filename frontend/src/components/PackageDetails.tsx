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
   <>
      Hi there
   </>
  );
};

export default PackageDetails;
