// import { render, screen, waitFor } from "@testing-library/react";
// import axios from "axios";
// import PackageList from "../src/components/PackageList"; // Adjust the import path if needed

// // Mock the axios module
// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe("PackageList Component", () => {
//   it("should display a message when no packages are available", async () => {
//     // Mock the axios get request to return an empty list
//     mockedAxios.get.mockResolvedValueOnce({ data: [] });

//     // Render the component
//     render(<PackageList />);

//     // Check for loading message
//     expect(screen.getByText(/Loading packages.../i)).toBeInTheDocument();

//     // Wait for the loading to finish and check for no packages message
//     await waitFor(() => {
//       expect(screen.getByText(/No packages available/i)).toBeInTheDocument();
//     });
//   });
// });
