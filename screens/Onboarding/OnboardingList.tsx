import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OnboardingItem from "./OnboardingItem";
import { ScrollView } from "react-native";

type Props = {};

const OnboardingList = (props: Props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      centerContent
      style={{ flex: 1 }}
      horizontal
      pagingEnabled
    >
      <OnboardingItem
        image={require("../../assets/images/illustration1.png")}
      />
      <OnboardingItem
        image={require("../../assets/images/illustration1.png")}
      />
      <OnboardingItem
        image={require("../../assets/images/illustration1.png")}
      />
    </ScrollView>
  );
};

export default OnboardingList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
});
