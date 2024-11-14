import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SignUpItem from "./SignUpItem";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ISignup } from "../../../interfaces/ISignup";
import { IErrors } from "../../../interfaces/IErrors";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const SignUp = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signinInputs, setSigninInputs] = useState<ISignup>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    jobTitle: "",
  });

  const [errorsInput, setErrorsInput] = useState<IErrors>({
    emailErrors: [],
    passwordErrors: [],
  });

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleTextInput(key: string, value: string) {
    setSigninInputs({ ...signinInputs, [key]: value });
  }

  function submit() {}

  return (
    <SignUpItem
      handleTextInput={handleTextInput}
      submit={submit}
      errors={errorsInput}
      handleShowPassword={handleShowPassword}
      showPassword={showPassword}
      signinInputs={signinInputs}
      navigation={props.navigation}
    />
  );
};

export default SignUp;

const styles = StyleSheet.create({});
