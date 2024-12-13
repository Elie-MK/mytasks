import React, { useEffect } from "react";

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
    startDate: "",
    endDate: "",
    category: "",
    assignedTo: [],
    description: "",
  });
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

  const handleCreateTask = () => {
    const newTask = { ...task, id: Date.now(), assignedTo: coworkers };
    dispatch(addTask(newTask));
    navigation.goBack();
  };

  return (
    <CreateTaskUI
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
