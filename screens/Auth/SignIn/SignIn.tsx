import React, { useState } from "react";
import SignInItem from "./SignInItem";
import { ISignin } from "../../../interfaces/ISignin";
import { ErrorHandler } from "../../../config/ErrorHandler";
import { IErrors } from "../../../interfaces/IErrors";
import { useValidationInputs } from "../../../hooks/useValidationInputs";

type Props = {};

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

  const submit = () => {
    if (isValid) {
      console.log("Valid inputs");
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

  return (
    <SignInItem
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
