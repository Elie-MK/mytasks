import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Color";
import { AntDesign } from "@expo/vector-icons";

type Props = {};

const AddTaskButton = (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
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
