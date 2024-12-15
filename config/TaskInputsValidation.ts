import { TaskCategory } from "../constants/TaskCategory";

let title: string[] = [];
let startDate: Date | null | string[] = [];
let endDate: Date | null | string[] = [];
let category: string[] = [];

export const TaskInputsValidation = {
  title: (value: string) => {
    title = [];

    if (!value) {
      title.push("Title is required.");
      return false;
    } else if (value.length < 5) {
      title.push("The length must be at least 5 characters long.");
      return false;
    }
    return true;
  },
  startDate: (value: Date | null | string) => {
    startDate = [];
    if (value === null || value === "") {
      startDate.push("Start date is required.");
      return false;
    } else if (!(value instanceof Date) || isNaN(value.getFullYear())) {
      startDate.push("Start date must be a valid date.");
    }
    return true;
  },

  endDate: (value: Date | null | string) => {
    endDate = [];
    if (value === null || value === "") {
      endDate.push("End date is required.");
      return false;
    } else if (!(value instanceof Date) || isNaN(value.getFullYear())) {
      endDate.push("End date must be a valid date.");
    }
    return true;
  },

  category: (value: TaskCategory) => {
    category = [];
    if (!value) {
      category.push("Category is required.");
      return false;
    } else if (
      value !== TaskCategory.BACKEND &&
      value !== TaskCategory.DESIGN &&
      value !== TaskCategory.FRONTEND &&
      value !== TaskCategory.PERSONAL
    ) {
      category.push(
        "Category must be one of: Backend, Design, Frontend, or Personal."
      );
      return false;
    }
    return true;
  },
  getErrors: () => {
    return { title, startDate, endDate, category };
  },
};
