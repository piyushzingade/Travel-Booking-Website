// services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPackages = async () => {
  const response = await axios.get(`${API_URL}/packages`);
  return response.data;
};
