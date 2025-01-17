import React, { useEffect, useState, useCallback } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { useDispatch, useSelector } from "react-redux";

import HomeUI from "./HomeIUI";
import { authServices } from "../../../api/services/auth.service";
import { taskServices } from "../../../api/services/task.service";
import { Sort, Status, UserResponse } from "../../../api/types/models";
import { RootState } from "../../../store/store";
import { addTasks, removeTask } from "../../../store/taskSlice";
import { RootStackParamList } from "../../../types/RootStackParamList";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Home = (props: Props) => {
  const tasks = useSelector((state: RootState) => state.task);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserResponse | undefined>(
    undefined
  );
  const [lastSelectedTask, setLastSelectedTask] = useState<{
    id: number;
    ref: SwipeableMethods | null;
  }>({ id: 0, ref: null });

  const dispatch = useDispatch();

  const fetchTasks = useCallback(async () => {
    const sort: Sort = {
      page: 0,
      field: "createdAt",
      order: "desc",
    };
    setIsFetchingData(true);
    try {
      const response = await taskServices.myTasks(sort);
      if (response.status === Status.SUCCESS) {
        dispatch(addTasks(response.data));
      }
    } catch (error) {
      setIsFetchingData(false);
      console.log(error);
    } finally {
      setIsFetchingData(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [dispatch, fetchTasks]);

  const fetchCurrentUser = async () => {
    try {
      const response = await authServices.currentUser();
      if (response.status === Status.SUCCESS) {
        setCurrentUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  function onRefresh() {
    fetchTasks();
  }

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
    console.log("Edit task with id: ", id);
  }

  return (
    <HomeUI
      isFetchingData={isFetchingData}
      navigation={props.navigation}
      tasks={tasks}
      onRefresh={onRefresh}
      user={currentUser}
      lastSelectedTask={lastSelectedTask}
      setLastSelectedTask={setLastSelectedTask}
      onDelete={handleOnDelete}
      onModify={handleOnEdit}
    />
  );
};

export default Home;
