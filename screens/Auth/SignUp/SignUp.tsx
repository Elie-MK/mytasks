import React, { useState } from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SignUpItem from "./SignUpItem";
import { authServices } from "../../../api/services/auth.service";
import { Status } from "../../../api/types/models";
import { ErrorHandler } from "../../../config/ErrorHandler";
import { useNotificatiom } from "../../../context/NotificationContext";
import { useValidationInputs } from "../../../hooks/useValidationInputs";
import { ISignup } from "../../../interfaces/ISignup";
import { ISignupErrors } from "../../../interfaces/ISignupErrors";

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
    organizationName: "",
    organizationEmail: "",
  });
  const [errorsInput, setErrorsInput] = useState<ISignupErrors>({
    emailErrors: [],
    passwordErrors: [],
    fullNameErrors: [],
    jobTitleErrors: [],
    organizationNameErrors: [],
    organizationEmailErrors: [],
  });
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
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
    if (key === "fullName")
      setErrorsInput({ ...errorsInput, fullNameErrors: [] });
    if (key === "jobTitle")
      setErrorsInput({ ...errorsInput, jobTitleErrors: [] });
    if (key === "organizationName")
      setErrorsInput({ ...errorsInput, organizationNameErrors: [] });
    if (key === "organizationEmail") {
      value = value.toLowerCase();
      setErrorsInput({ ...errorsInput, organizationEmailErrors: [] });
    }

    setSignupInputs({ ...signupInputs, [key]: value });
  }

  const { isValid } = useValidationInputs(signupInputs);

  async function submit() {
    if (isValid) {
      setIsRegistering(true);
      try {
        const response = await authServices.register({
          ...signupInputs,
          notificationToken: expoPushToken! ? expoPushToken : "",
        });
        if (response.status === Status.SUCCESS) {
          setIsRegistering(false);
          props.navigation.replace("SignIn");
        }
        console.log(response);
      } catch (error) {
        setIsRegistering(true);
        console.log(error);
      }
    } else {
      handleError();
    }
  }

  const handleError = () => {
    if (!ErrorHandler.validateEmail(signupInputs.email)) {
      setErrorsInput({
        ...errorsInput,
        emailErrors: ErrorHandler.getErrors().errors.emailErrors,
      });
    } else if (!ErrorHandler.fullName(signupInputs.fullName)) {
      setErrorsInput({
        ...errorsInput,
        fullNameErrors: ErrorHandler.getErrors().errors.fullNameErrors,
      });
    } else if (!ErrorHandler.validatePassword(signupInputs.password)) {
      setErrorsInput({
        ...errorsInput,
        passwordErrors: ErrorHandler.getErrors().errors.passwordErrors,
      });
    } else if (!ErrorHandler.jobTitle(signupInputs.jobTitle)) {
      setErrorsInput({
        ...errorsInput,
        jobTitleErrors: ErrorHandler.getErrors().errors.jobTitleErrors,
      });
    } else if (!ErrorHandler.organizationName(signupInputs.organizationName)) {
      setErrorsInput({
        ...errorsInput,
        organizationNameErrors:
          ErrorHandler.getErrors().errors.organizationNameErrors,
      });
    } else if (
      !ErrorHandler.organizationEmail(signupInputs.organizationEmail)
    ) {
      setErrorsInput({
        ...errorsInput,
        organizationEmailErrors:
          ErrorHandler.getErrors().errors.organizationEmailErrors,
      });
    }
  };

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
      isRegistering={isRegistering}
    />
  );
};

export default SignUp;
