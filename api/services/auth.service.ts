import { ISignin } from "../../interfaces/ISignin";
import { ISignup } from "../../interfaces/ISignup";
import api from "../config";
import { API_ENDPOINTS } from "../endpoints";
import { ApiResponse } from "../types/api.types";
import { JwtToken, UserResponse } from "../types/models";

export const authServices = {
  login: async (data: ISignin) => {
    const response = await api.post<ApiResponse<JwtToken>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },
  register: async (data: ISignup) => {
    const response = await api.post<ApiResponse<JwtToken>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },
  currentUser: async () => {
    const response = await api.get<ApiResponse<UserResponse>>(
      API_ENDPOINTS.AUTH.CURRENT_USER
    );
    return response.data;
  },
};
