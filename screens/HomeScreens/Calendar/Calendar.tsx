import React, { useState } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { useDispatch, useSelector } from "react-redux";

import CalendarUI from "./CalendarUI";
import { taskServices } from "../../../api/services/task.service";
import { Status } from "../../../api/types/models";
import { RootState } from "../../../store/store";
import { removeTask } from "../../../store/taskSlice";
import { RootStackParamList } from "../../../types/RootStackParamList";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Calendar = (props: Props) => {
  const [lastSelectedTask, setLastSelectedTask] = useState<{
    id: number;
    ref: SwipeableMethods | null;
  }>({ id: 0, ref: null });
  const tasks = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch();

  async function handleOnDelete(id: number) {
    dispatch(removeTask(id));
    try {
      const response = await taskServices.deleteTask(id);
      if (response.status === Status.SUCCESS) {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnEdit(id: number) {
    props.navigation.navigate("CreateTask", { idTask: id });
  }

  return (
    <CalendarUI
      tasks={tasks}
      lastSelectedTask={lastSelectedTask}
      setLastSelectedTask={setLastSelectedTask}
      navigation={props.navigation}
      onDelete={handleOnDelete}
      onModify={handleOnEdit}
    />
  );
};

export default Calendar;
