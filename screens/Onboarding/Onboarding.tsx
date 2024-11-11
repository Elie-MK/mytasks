import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import OnboardingItem from "./OnboardingItem";
import OnboardingList from "./OnboardingList";

type Props = {};

const Onboarding = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingList />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
