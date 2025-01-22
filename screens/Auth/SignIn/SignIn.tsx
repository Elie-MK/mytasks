import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AxiosError, isAxiosError } from "axios";
import { Alert } from "react-native";

import SignInItem from "./SignInUI";
import { authServices } from "../../../api/services/auth.service";
import { JwtToken, Status, ErrorResponse } from "../../../api/types/models";
import { ErrorHandler } from "../../../config/ErrorHandler";
import { ISignin } from "../../../interfaces/ISignin";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const SignIn = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [signinInputs, setSigninInputs] = useState<ISignin>({
    email: "",
    password: "",
  });
  const [errorsInput, setErrorsInput] = useState<string[]>([]);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleTextInput(key: string, value: string) {
    if (key === "email") {
      setErrorsInput([]);
      value = value.trim().toLowerCase();
    }

    setSigninInputs({ ...signinInputs, [key]: value });
  }

  const submit = async () => {
    if (ErrorHandler.validateEmail(signinInputs.email)) {
      setIsLogin(true);
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
            setIsLogin(false);
          });
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          if (axiosError.response && axiosError.response.data) {
            const errorResponse = axiosError.response.data as ErrorResponse;
            Alert.alert(
              errorResponse.message,
              "Please verify your credentials"
            );
          }
        }
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
      if (!ErrorHandler.validateEmail(signinInputs.email)) {
        setErrorsInput([...ErrorHandler.getErrors().errors.emailErrors]);
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
      isRefresh={isLogin}
    />
  );
};

export default SignIn;
