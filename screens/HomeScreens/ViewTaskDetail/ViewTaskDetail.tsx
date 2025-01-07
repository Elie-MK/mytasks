import React, { useEffect, useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ViewTaskDetailUI from "./ViewTaskDetailUI";
import { taskServices } from "../../../api/services/task.service";
import { Status, TaskResponse } from "../../../api/types/models";
import { RootStackParamList } from "../../../types/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetail">;

const ViewTaskDetail: React.FC<Props> = ({ navigation, route }) => {
  const { idTask } = route.params;
  const [task, setTask] = useState<TaskResponse | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTask() {
      setLoading(true);
      const response = await taskServices.getTask(idTask);
      if (response.status === Status.SUCCESS) {
        setLoading(false);
        setTask(response.data);
      } else {
        setLoading(false);
        setTask(undefined);
      }
    }
    getTask();
  }, [idTask]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: "Roboto-bold",
      },
      headerTitle: "Task Details",
    });
  }, [navigation]);

  return (
    <ViewTaskDetailUI navigation={navigation} task={task} loading={loading} />
  );
};

export default ViewTaskDetail;
