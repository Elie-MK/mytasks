import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import CalendarUI from "./CalendarUI";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Calendar = (props: Props) => {
  return <CalendarUI navigation={props.navigation} />;
};

export default Calendar;

const styles = StyleSheet.create({});
