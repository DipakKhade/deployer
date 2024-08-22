import axios from 'axios';
import { BACKEND_URL } from './utils';

export const axios_ = axios.create({
  baseURL: BACKEND_URL
});

axios_.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

