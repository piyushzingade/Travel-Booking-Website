// pages/PackagePage.tsx
import React from "react";
import PackageDetails from "../components/PackageDetails";
import BookingForm from "../components/BookingForm";

const PackagePage: React.FC = () => {
  return (
    <div>
      <PackageDetails />
      <BookingForm />
    </div>
  );
};

export default PackagePage;
