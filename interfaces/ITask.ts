import { IUser } from "./IUser";

export interface ITask {
  id: number;
  title: string;
  startDate: Date | null | string;
  endDate: Date | null | string;
  description?: string;
  category: string;
  assignedTo?: IUser[];
}
