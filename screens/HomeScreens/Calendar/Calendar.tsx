import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CalendarUI from "./CalendarUI";
import { RootState } from "../../../store/store";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Calendar = (props: Props) => {
  const tasks = useSelector((state: RootState) => state.task);

  return <CalendarUI tasks={tasks} navigation={props.navigation} />;
};

export default Calendar;

const styles = StyleSheet.create({});
