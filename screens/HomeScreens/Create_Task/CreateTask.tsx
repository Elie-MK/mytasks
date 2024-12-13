import React, { useEffect, useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import CreateTaskUI from "./CreateTaskUI";
import { users } from "./ListOfCoworkers/dummyUsers";
import { ITask } from "../../../interfaces/ITask";
import { addTask } from "../../../store/taskSlice";
import { RootStackParamList } from "../../../types/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "CreateTask">;

const CreateTask: React.FC<Props> = ({ navigation, route }) => {
  const { datas } = route.params ?? { datas: [] };

  const [task, setTask] = React.useState<ITask>({
    id: 0,
    title: "",
    startDate: null,
    endDate: null,
    category: "",
    assignedTo: [],
    description: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [inputDate, setInputDate] = useState<string>("");

  const dispatch = useDispatch();

  const coworkers = users.filter((user) => datas.includes(user.id));

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
    setTask({
      ...task,
      [inputName]: value,
    });
  };

  const showDatePicker = (nameInput: string) => {
    setInputDate(nameInput);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
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

  const handleCreateTask = () => {
    const newTask = { ...task, id: Date.now(), assignedTo: coworkers };
    dispatch(addTask(newTask));
    navigation.goBack();
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
    />
  );
};

export default CreateTask;
