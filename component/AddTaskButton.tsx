import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Color";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

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
