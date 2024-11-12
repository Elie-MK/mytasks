import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import OnboardingList from "./OnboardingList";
import { Colors } from "../../constants/Color";
import GetStartedButton from "../../component/GetStartedButton";

type Props = {};

const Onboarding = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingList />
      <GetStartedButton />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
