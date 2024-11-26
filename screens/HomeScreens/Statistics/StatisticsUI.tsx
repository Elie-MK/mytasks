import React from "react";

import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";

import BarChart from "../../../component/BarChart";
import StatsCard from "../../../component/StatsCard";
import { Colors } from "../../../constants/Color";

export default function StatisticsUI() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Statistics</Text>
      <View>
        <Text style={styles.taskText}>20 Tasks</Text>
        <Text style={styles.desc}>Assigned to you this week.</Text>
      </View>
      <BarChart />
      <View>
        <Text style={[styles.textHeader, { textAlign: "left" }]}>
          Tasks statistics
        </Text>
        <ScrollView>
          <StatsCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  textHeader: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Roboto-bold",
  },
  taskText: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
  },
  desc: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  statCard: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
});
