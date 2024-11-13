import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import OnboardingList from "./OnboardingList";
import { Colors } from "../../constants/Color";
import Button from "../../component/ui/Button";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Onboarding = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingList />
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => props.navigation.navigate("SignIn")}
        />
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
