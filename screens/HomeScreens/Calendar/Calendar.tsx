import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CalendarItem from "./CalendarItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Calendar = (props: Props) => {
  return <CalendarItem navigation={props.navigation} />;
};

export default Calendar;

const styles = StyleSheet.create({});
