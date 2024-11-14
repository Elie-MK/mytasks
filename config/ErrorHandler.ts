const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let emailErrors: string[] = [];
let passwordErrors: string[] = [];

export const ErrorHandler = {
  validateEmail: (email: string) => {
    emailErrors = [];
    // Validate email
    const verifyEmail = emailRegex.test(email);
    if (!verifyEmail) {
      emailErrors.push(
        "Invalid email address. Please use a valid format (e.g., example@domain.com)."
      );
      return false;
    }
    return true;
  },

  validatePassword: (password: string) => {
    passwordErrors = [];
    // Password validation checks

    let isValid = true;

    if (!password) {
      passwordErrors.push("Password is required.");
      isValid = false;
    }

    // Check for minimum length (8 characters)
    if (password.length < 8) {
      passwordErrors.push("Password must be at least 8 characters long.");
      isValid = false;
    }

    // Check for at least one lowercase letter
    if (!/(?=.*[a-z])/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one lowercase letter."
      );
      isValid = false;
    }

    // Check for at least one uppercase letter
    if (!/(?=.*[A-Z])/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one uppercase letter."
      );
      isValid = false;
    }

    // Check for at least one digit (one or more digits)
    if (!/\d+/.test(password)) {
      passwordErrors.push("Password must contain at least one number.");
      isValid = false;
    }

    // Check for at least one special character
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one special character (e.g., @$!%*?&)."
      );
      isValid = false;
    }

    return isValid;
  },
  getErrors: () => {
    return { emailErrors, passwordErrors };
  },
};
