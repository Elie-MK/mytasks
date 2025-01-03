import { useEffect, useState } from "react";

import { TaskResponse } from "../api/types/models";
import { TaskInputsValidation } from "../config/TaskInputsValidation";

export function useTaskInputsValidation(task: TaskResponse) {
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      TaskInputsValidation.title(task.name) &&
      TaskInputsValidation.startDate(task.startDate) &&
      TaskInputsValidation.endDate(task.endDate) &&
      TaskInputsValidation.category(task.category) &&
      TaskInputsValidation.checkDate(task.startDate, task.endDate)
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [task]);

  return { formValid };
}
