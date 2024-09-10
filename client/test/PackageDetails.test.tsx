import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PackageDetails from "../src/components/DetailPackage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getPackages } from "../src/services/api";

// Mock the getPackages API call
jest.mock("../services/api", () => ({
  getPackages: jest.fn(),
}));

// Mock the react-hot-toast toast
jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("PackageDetails", () => {
  const mockPackage = {
    destination: "Bali, Indonesia",
    price: 1200,
    rating: 4.5,
    duration: "7 days",
    description1:
      "Experience the tropical paradise of Bali with beaches, culture, and more.",
    description2:
      "Bali is a dream destination for many, offering a perfect blend of natural beauty, cultural richness, and modern amenities. This 7-day package will take you to some of Bali’s most iconic locations like Ubud’s Sacred Monkey Forest, the breathtaking rice terraces of Tegallalang, and the famous Uluwatu Temple perched on a cliff. Enjoy daily yoga sessions and unwind at luxury resorts with world-class spa facilities. The island’s vibrant arts scene and unique Balinese cuisine will captivate your senses, while the friendly locals will make you feel right at home.",
    imageUrl:
      "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders package details correctly", async () => {
    (getPackages as jest.Mock).mockResolvedValueOnce([mockPackage]);

    render(
      <MemoryRouter initialEntries={["/packages/1"]}>
        <Routes>
          <Route path="/packages/:id" element={<PackageDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the package to be loaded
    await waitFor(() => {
      expect(screen.getByText(mockPackage.destination)).toBeInTheDocument();
    });

    // Check that the description and price are displayed
    expect(screen.getByText(mockPackage.description1)).toBeInTheDocument();
    expect(screen.getByText(`$${mockPackage.price}`)).toBeInTheDocument();
  });

  test("shows error toast when booking without selecting a date", async () => {
    (getPackages as jest.Mock).mockResolvedValueOnce([mockPackage]);

    render(
      <MemoryRouter initialEntries={["/packages/1"]}>
        <Routes>
          <Route path="/packages/:id" element={<PackageDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the package to be loaded
    await waitFor(() => {
      expect(screen.getByText(mockPackage.destination)).toBeInTheDocument();
    });

    // Click the "Book Travel" button without selecting a date
    fireEvent.click(screen.getByText("Book Travel"));

    // Check that the error toast is shown
    expect(toast.error).toHaveBeenCalledWith(
      "Please select a date before proceeding"
    );
  });
});
