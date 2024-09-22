// utils/axiosInstance.ts

import axios from 'axios';
import getConfig from './config';

const baseURL = getConfig()

const axiosInstance = axios.create({
  baseURL: baseURL, // Replace with your API base URL
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const session =  JSON.parse(localStorage.getItem('sb-tyovdghdcocaopwvmibm-auth-token') || '{}');
//     const accessToken = session.access_token;
//     const refreshToken = session.refresh_token

 
  
//     if (accessToken || refreshToken) {
//       const cookies = [];
//       if (accessToken) cookies.push(`access_token=${accessToken}; Secure; HttpOnly; SameSite=lax; Path=/`);
//       if (refreshToken) cookies.push(`refresh_token=${refreshToken}; Secure; HttpOnly; SameSite=lax; Path=/`);
//       config.headers['Cookie'] = cookies.join('; ');
//     }


//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;