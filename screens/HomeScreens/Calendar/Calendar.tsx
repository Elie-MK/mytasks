import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import CalendarUI from "./CalendarUI";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Calendar = (props: Props) => {
  return <CalendarUI navigation={props.navigation} />;
};

export default Calendar;

const styles = StyleSheet.create({});
