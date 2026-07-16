import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4004';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ success: boolean; message: string }>) => {
    const backendMessage = error.response?.data?.message;
    if (backendMessage) {
      error.message = backendMessage;
    }
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);
