import React from "react";

import { Dimensions, StyleSheet, Text, View } from "react-native";

const height = Dimensions.get("window").height;

const EmptyTaskList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>No tasks available</Text>
        <Text style={styles.text}>
          Tap the &quot;Add&quot; button to create your first task.
        </Text>
      </View>
    </View>
  );
};

export default EmptyTaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: height / 5,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Roboto-regular",
  },
});
