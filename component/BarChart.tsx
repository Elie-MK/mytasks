import React, { useMemo } from "react";

import { useFont } from "@shopify/react-native-skia";
import { StyleSheet, Text, View } from "react-native";
import { Bar, CartesianChart } from "victory-native";

import regular from "../assets/fonts/Roboto-Regular.ttf";
import { Colors } from "../constants/Color";

type Props = {};

const BarChart = (props: Props) => {
  const DATA = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        month: i + 1,
        highTmp: 20 + 30 * Math.random(),
        color: Colors.BLUE,
      })),
    []
  );
  const font = useFont(regular, 12);
  if (!font) {
    return null;
  }
  return (
    <View
      style={{
        height: 300,
        backgroundColor: Colors.LIGHT_GRAY,
        marginTop: 10,
        borderRadius: 8,
      }}
    >
      <View>
        <Text style={styles.title}>Assigned Tasks</Text>
      </View>
      <CartesianChart
        xKey="month"
        yKeys={["highTmp"]}
        padding={15}
        domain={{ y: [0, 50] }}
        domainPadding={{ left: 30, right: 30, top: 30 }}
        data={DATA}
        axisOptions={{
          font,
          tickCount: 7,
          labelColor: "#000",
          formatXLabel: (value) => {
            const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return week[value - 1];
          },
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            animate={{ type: "timing", duration: 1000 }}
            roundedCorners={{
              topLeft: 10,
              topRight: 10,
              bottomLeft: 10,
              bottomRight: 10,
            }}
            color={Colors.BLUE}
            points={points.highTmp}
            chartBounds={chartBounds}
            barWidth={30}
          />
        )}
      </CartesianChart>
    </View>
  );
};

export default BarChart;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Roboto-bold",
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 10,
  },
});
