import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Color";

type Props = {};

const GetStartedButton = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>Get Started</Text>
    </TouchableOpacity>
  );
};

export default GetStartedButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLUE,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  text: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },
});
