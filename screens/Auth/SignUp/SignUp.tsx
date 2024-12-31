import React, { useState } from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import SignUpItem from "./SignUpItem";
import { authServices } from "../../../api/services/auth.service";
import { Status } from "../../../api/types/models";
import { ErrorHandler } from "../../../config/ErrorHandler";
import { useNotificatiom } from "../../../context/NotificationContext";
import { useValidationInputs } from "../../../hooks/useValidationInputs";
import { IErrors } from "../../../interfaces/IErrors";
import { ISignup } from "../../../interfaces/ISignup";

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
  const { expoPushToken, error, notification } = useNotificatiom();

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
        const response = await authServices.register({
          ...signupInputs,
          notificationToken: expoPushToken!,
        });
        if (response.status === Status.SUCCESS) {
          props.navigation.replace("SignIn");
        }
        console.log(response);
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

  // console.log(JSON.stringify(notification, null, 2));

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
