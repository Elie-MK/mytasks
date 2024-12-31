import React, { useEffect, useRef, useState } from "react";

import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { StyleSheet, Text, View } from "react-native";

import SignUpItem from "./SignUpItem";
import { authServices } from "../../../api/services/auth.service";
import { Status } from "../../../api/types/models";
import { ErrorHandler } from "../../../config/ErrorHandler";
import { useValidationInputs } from "../../../hooks/useValidationInputs";
import { IErrors } from "../../../interfaces/IErrors";
import { ISignup } from "../../../interfaces/ISignup";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const SignUp = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signupInputs, setSignupInputs] = useState<ISignup>({
    email: "",
    password: "",
    fullName: "",
    jobTitle: "",
    notificationToken: "",
    profileUrl: "",
  });
  const [errorsInput, setErrorsInput] = useState<IErrors>({
    emailErrors: [],
    passwordErrors: [],
  });

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleTextInput(key: string, value: string) {
    if (key === "email") {
      setErrorsInput({ ...errorsInput, emailErrors: [] });
      value = value.toLowerCase();
    }
    if (key === "password")
      setErrorsInput({ ...errorsInput, passwordErrors: [] });
    setSignupInputs({ ...signupInputs, [key]: value });
  }

  const { isValid } = useValidationInputs(signupInputs);

  async function submit() {
    if (isValid) {
      try {
        const response = await authServices.register(signupInputs);
        if (response.status === Status.SUCCESS) {
          props.navigation.replace("SignIn");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!ErrorHandler.validateEmail(signupInputs.email)) {
        setErrorsInput({
          ...errorsInput,
          emailErrors: ErrorHandler.getErrors().emailErrors,
        });
      } else if (!ErrorHandler.validatePassword(signupInputs.password)) {
        setErrorsInput({
          ...errorsInput,
          passwordErrors: ErrorHandler.getErrors().passwordErrors,
        });
      }
    }
  }

  return (
    <SignUpItem
      handleTextInput={handleTextInput}
      submit={submit}
      errors={errorsInput}
      handleShowPassword={handleShowPassword}
      showPassword={showPassword}
      signinInputs={signupInputs}
      navigation={props.navigation}
    />
  );
};

export default SignUp;

const styles = StyleSheet.create({});
