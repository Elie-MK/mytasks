import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "../constants/Color";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const AddTaskButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("CreateTask")}
      activeOpacity={0.7}
      style={styles.container}
    >
      <AntDesign name="plus" size={24} color={Colors.WHITE} />
    </TouchableOpacity>
  );
};

export default AddTaskButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLUE,
    padding: 20,
    borderRadius: 50,
    alignSelf: "flex-end",
  },
});
