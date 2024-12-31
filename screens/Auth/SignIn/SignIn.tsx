import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SignInItem from "./SignInItem";
import { authServices } from "../../../api/services/auth.service";
import { JwtToken, Status } from "../../../api/types/models";
import { ErrorHandler } from "../../../config/ErrorHandler";
import { useValidationInputs } from "../../../hooks/useValidationInputs";
import { IErrors } from "../../../interfaces/IErrors";
import { ISignin } from "../../../interfaces/ISignin";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const SignIn = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signinInputs, setSigninInputs] = useState<ISignin>({
    email: "",
    password: "",
  });
  const [errorsInput, setErrorsInput] = useState<IErrors>({
    emailErrors: [],
    passwordErrors: [],
  });
  const { isValid } = useValidationInputs(signinInputs);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleTextInput(key: string, value: string) {
    if (key === "email") setErrorsInput({ ...errorsInput, emailErrors: [] });
    if (key === "password")
      setErrorsInput({ ...errorsInput, passwordErrors: [] });
    setSigninInputs({ ...signinInputs, [key]: value });
  }

  const submit = async () => {
    if (isValid) {
      try {
        const response = await authServices.login(signinInputs);
        if (response.status === Status.SUCCESS) {
          await AsyncStorage.setItem("token", response.data.jwt_token);
          await AsyncStorage.setItem(
            "refresh_token",
            response.data.refresh_token
          );
          storeTokens(response.data).then(() => {
            props.navigation.replace("HomeMain");
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!ErrorHandler.validateEmail(signinInputs.email)) {
        setErrorsInput({
          ...errorsInput,
          emailErrors: ErrorHandler.getErrors().emailErrors,
        });
      } else if (!ErrorHandler.validatePassword(signinInputs.password)) {
        setErrorsInput({
          ...errorsInput,
          passwordErrors: ErrorHandler.getErrors().passwordErrors,
        });
      }
    }
  };

  const storeTokens = async (tokens: JwtToken) => {
    try {
      await Promise.all([
        AsyncStorage.setItem("token", tokens.jwt_token.trim()),
        AsyncStorage.setItem("refresh_token", tokens.refresh_token.trim()),
      ]);
    } catch (error) {
      console.error("Error storing tokens:", error);
      throw new Error("Failed to store authentication tokens");
    }
  };

  return (
    <SignInItem
      navigation={props.navigation}
      handleShowPassword={handleShowPassword}
      showPassword={showPassword}
      signinInputs={signinInputs}
      submit={submit}
      errors={errorsInput}
      handleTextInput={handleTextInput}
    />
  );
};

export default SignIn;
