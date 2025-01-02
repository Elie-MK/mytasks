import { useEffect, useState } from "react";

import { ErrorHandler } from "../config/ErrorHandler";
import { ISignin } from "../interfaces/ISignin";

export function useValidationInputs({ email }: ISignin) {
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (ErrorHandler.validateEmail(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email]);

  return { isValid };
}
