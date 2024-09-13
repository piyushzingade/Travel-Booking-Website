
import axios from "axios";

export const getPackages = async () => {
  try {
    const response = await axios.get("http://localhost:3002/allPackages");
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};
