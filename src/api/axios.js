import axios from "axios";

const baseURL = "http://127.0.0.1:5000/";

export const api = axios.create({
  baseURL,
  // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //   "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //   "Access-Control-Allow-Credentials": "true",
  // },
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized error
    }
    return Promise.reject(error);
  }
);

