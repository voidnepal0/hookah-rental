/**
 * Axios Instance Configuration
 */

import axios from 'axios';

export const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID || '';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Interface for enhanced error with additional properties
interface EnhancedError extends Error {
  status?: number;
  response?: unknown;
}

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      const errorMessage = data?.message || data?.error || `Request failed with status ${status}`;
      
      console.error(`❌ API Error ${status}:`, errorMessage);
      
      // Create a more descriptive error
      const enhancedError = new Error(errorMessage) as EnhancedError;
      enhancedError.name = 'ApiError';
      enhancedError.status = status;
      enhancedError.response = error.response;
      
      return Promise.reject(enhancedError);
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ Network Error:', error.message);
      const networkError = new Error('Network error. Please check your connection and try again.');
      networkError.name = 'NetworkError';
      return Promise.reject(networkError);
    } else {
      // Something else happened
      console.error('❌ Error:', error.message);
      return Promise.reject(error);
    }
  }
);
