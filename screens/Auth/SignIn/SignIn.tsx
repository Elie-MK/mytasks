import React, { useState } from "react";
import SignInItem from "./SignInItem";

type Props = {};

const SignIn = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <SignInItem
      handleShowPassword={handleShowPassword}
      showPassword={showPassword}
    />
  );
};

export default SignIn;
