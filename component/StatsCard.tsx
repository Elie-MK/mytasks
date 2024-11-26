import React, { useMemo } from "react";

import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

import { Colors } from "../constants/Color";

export default function StatsCard() {
  return (
    <View style={styles.statCard}>
      <View>
        <Text style={styles.taskText}>UI/UX Tasks</Text>
        <Text style={styles.desc}>10 of 20 completed</Text>
      </View>
      <CircularProgress
        value={100}
        radius={35}
        progressValueStyle={{ fontSize: 12, fontFamily: "Roboto-regular" }}
        inActiveStrokeColor={Colors.GRAY}
        activeStrokeColor={Colors.BLUE}
        inActiveStrokeOpacity={0.5}
        valueSuffix={"%"}
        progressValueColor={Colors.BLACK}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: Colors.GRAY,
  },
});
