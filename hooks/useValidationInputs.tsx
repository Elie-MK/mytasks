import { useEffect, useState } from "react";

import { ErrorHandler } from "../config/ErrorHandler";
import { ISignup } from "../interfaces/ISignup";

export function useValidationInputs({
  email,
  password,
  organizationEmail,
  organizationName,
}: ISignup) {
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (
      ErrorHandler.validateEmail(email) &&
      ErrorHandler.validatePassword(password) &&
      organizationEmail &&
      organizationName
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password, organizationEmail, organizationName]);

  return { isValid };
}
