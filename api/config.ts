import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/";

const api = axios.create({
  baseURL: BASE_URL,
  //   timeout: 10000,
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

export default api;
