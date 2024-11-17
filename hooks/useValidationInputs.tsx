import { useEffect, useState } from "react";
import { IErrors } from "../interfaces/IErrors";
import { ISignin } from "../interfaces/ISignin";
import { ErrorHandler } from "../config/ErrorHandler";

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
