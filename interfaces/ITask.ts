import { IUser } from "./IUser";

export interface ITask {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  category: string;
  assignedTo?: IUser[];
}
