import React, { useEffect, useState, useCallback } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import HomeUI from "./HomeIUI";
import { authServices } from "../../../api/services/auth.service";
import { taskServices } from "../../../api/services/task.service";
import { Sort, Status, UserResponse } from "../../../api/types/models";
import { RootState } from "../../../store/store";
import { addTasks } from "../../../store/taskSlice";
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

  return (
    <HomeUI
      isFetchingData={isFetchingData}
      navigation={props.navigation}
      tasks={tasks}
      onRefresh={onRefresh}
      user={currentUser}
    />
  );
};

export default Home;
