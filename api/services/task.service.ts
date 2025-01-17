import api from "../config";
import { API_ENDPOINTS } from "../endpoints";
import { ApiResponse } from "../types/api.types";
import { Sort, TaskResponse } from "../types/models";

export const taskServices = {
  myTasks: async (sort: Sort) => {
    const response = await api.get<ApiResponse<TaskResponse[]>>(
      API_ENDPOINTS.TASK.MY_TASKS(sort)
    );
    return response.data;
  },
  createTask: async (data: TaskResponse) => {
    const response = await api.post<ApiResponse<TaskResponse>>(
      API_ENDPOINTS.TASK.CREATE_TASK,
      data
    );
    return response.data;
  },
  getTask: async (id: number) => {
    const response = await api.get<ApiResponse<TaskResponse>>(
      API_ENDPOINTS.TASK.GET_TASK(id)
    );
    return response.data;
  },
  deleteTask: async (id: number) => {
    const response = await api.delete<ApiResponse<string>>(
      API_ENDPOINTS.TASK.DELETE_TASK(id)
    );
    return response.data;
  },
};
