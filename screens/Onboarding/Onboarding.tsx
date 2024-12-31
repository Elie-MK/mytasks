import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, View } from "react-native";

import OnboardingList from "./OnboardingList";
import Button from "../../component/ui/Button";
import { Colors } from "../../constants/Color";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Onboarding = (props: Props) => {
  function handleGetStarted() {
    AsyncStorage.setItem("onboarded", "true");
    props.navigation.replace("SignIn");
  }

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingList />
      <View style={styles.buttonContainer}>
        <Button title="Get Started" onPress={handleGetStarted} />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
});
