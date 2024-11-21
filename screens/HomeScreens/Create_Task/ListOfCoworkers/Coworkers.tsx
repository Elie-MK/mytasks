import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CoworkerItem from "./CoworkerItem";

type Props = {};

const Coworkers = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select members</Text>
      <CoworkerItem />
    </View>
  );
};

export default Coworkers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
