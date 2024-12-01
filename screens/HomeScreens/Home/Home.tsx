import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import HomeUI from "./HomeIUI";
import { RootState } from "../../../store/store";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Home = (props: Props) => {
  const tasks = useSelector((state: RootState) => state.task);

  return <HomeUI navigation={props.navigation} tasks={tasks} />;
};

export default Home;
