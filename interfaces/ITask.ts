import { IUser } from "./IUser";
import { TaskCategory } from "../constants/TaskCategory";

export interface ITask {
  id: number;
  title: string;
  startDate: Date | null | string;
  endDate: Date | null | string;
  description?: string;
  category: TaskCategory;
  assignedTo?: IUser[];
}
