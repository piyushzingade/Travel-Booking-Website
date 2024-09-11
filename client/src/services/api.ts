import axios from "axios";

// Function to fetch travel packages from the API
export const getPackages = async () => {
  try {
    // Make a GET request to the API endpoint
    const response = await axios.get("http://localhost:3002/allPackages");

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching packages:", error);

    // Rethrow the error to be handled by the calling code
    throw error;
  }
};
