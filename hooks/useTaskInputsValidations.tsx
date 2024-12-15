import { useEffect, useState } from "react";

import { TaskInputsValidation } from "../config/TaskInputsValidation";
import { ITask } from "../interfaces/ITask";

export function useTaskInputsValidation(task: ITask) {
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      TaskInputsValidation.title(task.title) &&
      TaskInputsValidation.startDate(task.startDate) &&
      TaskInputsValidation.endDate(task.endDate) &&
      TaskInputsValidation.category(task.category)
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [task]);

  return { formValid };
}
