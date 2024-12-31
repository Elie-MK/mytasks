import { ISignin } from "../../interfaces/ISignin";
import api from "../config";
import { API_ENDPOINTS } from "../endpoints";
import { ApiResponse } from "../types/api.types";
import { JwtToken } from "../types/models";

export const authServices = {
  login: async (data: ISignin) => {
    const response = await api.post<ApiResponse<JwtToken>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },
};
