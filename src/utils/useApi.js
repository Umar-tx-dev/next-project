"use client"
import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
const useApi = (url, options = {}) => {
    console.log("Fetching data from:", url);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url, options);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);
  return { data, loading, error };
};
export default useApi;