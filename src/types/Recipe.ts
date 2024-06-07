// src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Set the base URL to port 8080
    withCredentials: true,
});

export default axiosInstance;
