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
};
