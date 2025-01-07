import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }
    return config;
  } catch (error) {
    console.error("Error getting token:", error);
    return config;
  }
});

// Refresh token flow
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = await AsyncStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/auth/token/refresh",
            {
              refreshToken: refreshToken,
            }
          );
          const newToken = response.data.data.jwt_token;
          await AsyncStorage.setItem("token", newToken);
          await AsyncStorage.setItem(
            "refresh_token",
            response.data.data.refresh_token
          );
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axios(error.config);
        } catch (refreshError) {
          console.log("Refresh token expired or invalid.");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
