import axios from "axios";

const baseURL = "http://127.0.0.1:5000";

export const api = axios.create({
  baseURL,
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
