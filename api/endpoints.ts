import { Sort } from "./types/models";

// src/api/endpoints.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REGISTERASADMIN: "/auth/admin/register",
    CURRENT_USER: "/auth/current-user",
  },
  TASK: {
    MY_TASKS: (sort: Sort) =>
      `/tasks/my-tasks?page=${sort.page}}&sort=${sort.field},${sort.order}`,
    CREATE_TASK: "/tasks/create",
    GET_TASK: (id: number) => `/tasks/${id}`,
    DELETE_TASK: (id: number) => `/tasks/${id}`,
    UPDATE_TASK: (id: number) => `/tasks/my-task/${id}`,
  },
} as const;
