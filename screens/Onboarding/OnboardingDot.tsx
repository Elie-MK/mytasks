import React from "react";

import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";

import { Colors } from "../../constants/Color";
import { IOnboarding } from "../../interfaces/IOnboarding";

type Props = {
  datas: IOnboarding[];
  scrollX: Animated.Value;
};

const OnboardingDot = (props: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {props.datas.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = props.scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: "clamp",
        });

        const opacity = props.scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        const color = props.scrollX.interpolate({
          inputRange,
          outputRange: [Colors.GRAY, Colors.BLUE, Colors.GRAY],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { width: dotWidth, opacity, backgroundColor: color },
            ]}
          />
        );
      })}
      <View style={styles.dot} />
    </View>
  );
};

export default OnboardingDot;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
