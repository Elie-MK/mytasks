import React, { useEffect, useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import CreateTaskUI from "./CreateTaskUI";
import { users } from "./ListOfCoworkers/dummyUsers";
import { taskServices } from "../../../api/services/task.service";
import { Status, TaskResponse } from "../../../api/types/models";
import { TaskInputsValidation } from "../../../config/TaskInputsValidation";
import { TaskCategory } from "../../../constants/TaskCategory";
import { useTaskInputsValidation } from "../../../hooks/useTaskInputsValidations";
import { ITaskInputsErrors } from "../../../interfaces/ITaskInputsErrors";
import { addTask, updateTask } from "../../../store/taskSlice";
import { RootStackParamList } from "../../../types/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "CreateTask">;

const CreateTask: React.FC<Props> = ({ navigation, route }) => {
  const { datas, idTask } = route.params ?? { datas: [], idTask: undefined };

  const [task, setTask] = useState<TaskResponse>({
    name: "",
    startDate: "",
    endDate: "",
    category: TaskCategory.PERSONAL,
    assignedUserIds: [],
    description: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [inputDate, setInputDate] = useState<string>("");
  const [errorsInput, setErrorsInput] = useState<ITaskInputsErrors>({
    title: [],
    startDate: [],
    endDate: [],
    category: [],
  });
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);

  const dispatch = useDispatch();

  const coworkers = users.filter((user) => datas?.includes(user.id));

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      title: "Create Task",
    });
  }, [navigation]);

  const handleValueChange = ({
    inputName,
    value,
  }: {
    inputName: string;
    value: string;
  }) => {
    handleResetError(inputName);
    setTask({
      ...task,
      [inputName]: value,
    });
  };

  const showDatePicker = (nameInput: string) => {
    setInputDate(nameInput);
    handleResetError(nameInput);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleResetError = (inputName: string) => {
    if (inputName === "name") setErrorsInput({ ...errorsInput, title: [] });
    if (inputName === "startDate")
      setErrorsInput({ ...errorsInput, startDate: [] });
    if (inputName === "endDate")
      setErrorsInput({ ...errorsInput, endDate: [] });
    if (inputName === "category")
      setErrorsInput({ ...errorsInput, category: [] });
  };

  const handleConfirmDate = (date: Date) => {
    if (inputDate === "endDate") {
      setTask({
        ...task,
        endDate: date.toISOString(),
      });
    } else {
      setTask({
        ...task,
        startDate: date.toISOString(),
      });
    }
    hideDatePicker();
  };

  useEffect(() => {
    const handleGetTask = async () => {
      try {
        const response = await taskServices.getTask(idTask!);
        if (response.status === Status.SUCCESS) {
          setTask(response.data);
        }
      } catch (error) {
        console.log("Error getting task", error);
      }
    };

    if (idTask) {
      handleGetTask();
    }
  }, [idTask]);

  const handleModifyTask = async () => {
    try {
      const response = await taskServices.updateTask(idTask!, task);
      if (response.status === Status.SUCCESS) {
        dispatch(updateTask(response.data));
        console.log(response.data);
        navigation.goBack();
      }
    } catch (error) {
      console.log("Error modifying task", error);
    }
  };

  const { formValid } = useTaskInputsValidation(task);

  const handleCreateTask = async () => {
    const newTask = {
      ...task,
      assignedUserIds: coworkers.map((user) => user.id),
    };
    if (formValid) {
      setIsCreatingTask(true);
      try {
        const response = await taskServices.createTask(newTask);
        if (response.status === Status.SUCCESS) {
          dispatch(addTask(response.data));
          navigation.goBack();
          setIsCreatingTask(false);
        }
      } catch (error) {
        console.log("Error creating task", error);
        setIsCreatingTask(false);
      }
    } else {
      setErrorsInput((prevErrors) => {
        return {
          ...prevErrors,
          title: TaskInputsValidation.getErrors().title,
          startDate: TaskInputsValidation.getErrors().startDate,
          endDate: TaskInputsValidation.getErrors().endDate,
          category: TaskInputsValidation.getErrors().category,
        };
      });
    }
  };

  return (
    <CreateTaskUI
      isDatePickerVisible={isDatePickerVisible}
      handleConfirm={handleConfirmDate}
      hideDatePicker={hideDatePicker}
      showDatePicker={showDatePicker}
      inputDateName={inputDate}
      task={task}
      coworkers={coworkers}
      handleValueChange={(inputName, value) =>
        handleValueChange({ inputName, value })
      }
      navigation={navigation}
      handleCreateTask={handleCreateTask}
      handleModifyTask={handleModifyTask}
      taskId={idTask}
      errorsInput={errorsInput}
      isCreatingTask={isCreatingTask}
    />
  );
};

export default CreateTask;
