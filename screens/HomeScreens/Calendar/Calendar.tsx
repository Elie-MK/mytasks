import React, { useState } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { useSelector } from "react-redux";

import CalendarUI from "./CalendarUI";
import { RootState } from "../../../store/store";
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

  return (
    <CalendarUI
      tasks={tasks}
      lastSelectedTask={lastSelectedTask}
      setLastSelectedTask={setLastSelectedTask}
      navigation={props.navigation}
    />
  );
};

export default Calendar;
