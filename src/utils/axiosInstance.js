// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://fakestoreapi.com', // Set your API base URL
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
