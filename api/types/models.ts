import { TaskCategory } from "../../constants/TaskCategory";

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  jobTitle: string;
  profileUrl: string;
  notificationToken: string;
  comments: Comment[];
  tasksIds: number[];
  role: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskResponse {
  id?: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  isCompleted?: boolean;
  category: TaskCategory;
  assignedUserIds?: number[];
  comments?: Comment[];
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ErrorResponse {
  message: string;
  details: string[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum Status {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface JwtToken {
  jwt_token: string;
  refresh_token: string;
}

export interface Sort {
  field: string;
  page?: number;
  order: "asc" | "desc";
}
