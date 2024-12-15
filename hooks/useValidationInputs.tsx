import { useEffect, useState } from "react";

import { ErrorHandler } from "../config/ErrorHandler";
import { ISignin } from "../interfaces/ISignin";

export function useValidationInputs({ email, password }: ISignin) {
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (
      ErrorHandler.validateEmail(email) &&
      ErrorHandler.validatePassword(password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password]);

  return { isValid };
}
