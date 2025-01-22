import { ISignupErrors } from "../interfaces/ISignupErrors";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let errors: ISignupErrors = {
  emailErrors: [],
  passwordErrors: [],
  fullNameErrors: [],
  jobTitleErrors: [],
  organizationNameErrors: [],
  organizationEmailErrors: [],
};

export const ErrorHandler = {
  validateEmail: (email: string) => {
    errors.emailErrors = [];
    // Validate email
    const verifyEmail = emailRegex.test(email);
    if (!verifyEmail) {
      errors.emailErrors.push(
        "Invalid email address. Please use a valid format (e.g., example@domain.com)."
      );
      return false;
    }
    return true;
  },

  fullName: (fullName: string) => {
    errors.fullNameErrors = [];
    // Full name validation checks
    if (fullName.length < 2) {
      errors.fullNameErrors.push("Full name is required.");
      return false;
    }
    return true;
  },
  jobTitle: (jobTitle: string) => {
    errors.jobTitleErrors = [];
    // Job title validation checks
    if (jobTitle.length < 2) {
      errors.jobTitleErrors.push("Job title is required.");
      return false;
    }
    return true;
  },

  organizationName: (organizationName: string) => {
    errors.organizationNameErrors = [];
    // Organization name validation checks
    if (organizationName.length < 2) {
      errors.organizationNameErrors.push("Organization name is required.");
      return false;
    }
    return true;
  },

  organizationEmail: (organizationEmail: string) => {
    errors.organizationEmailErrors = [];
    // Validate organization email
    const verifyOrganizationEmail = emailRegex.test(organizationEmail);
    if (!verifyOrganizationEmail) {
      errors.organizationEmailErrors.push(
        "Invalid organization email address. Please use a valid format (e.g. example@domain.com)."
      );
      return false;
    }
    return true;
  },

  validatePassword: (password: string) => {
    errors.passwordErrors = [];
    // Password validation checks

    let isValid = true;

    if (!password) {
      errors.passwordErrors.push("Password is required.");
      isValid = false;
    }

    // Check for minimum length (8 characters)
    if (password.length < 8) {
      errors.passwordErrors.push(
        "Password must be at least 8 characters long."
      );
      isValid = false;
    }

    // Check for at least one lowercase letter
    if (!/(?=.*[a-z])/.test(password)) {
      errors.passwordErrors.push(
        "Password must contain at least one lowercase letter."
      );
      isValid = false;
    }

    // Check for at least one uppercase letter
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.passwordErrors.push(
        "Password must contain at least one uppercase letter."
      );
      isValid = false;
    }

    // Check for at least one digit (one or more digits)
    if (!/\d+/.test(password)) {
      errors.passwordErrors.push("Password must contain at least one number.");
      isValid = false;
    }

    // Check for at least one special character
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.passwordErrors.push(
        "Password must contain at least one special character (e.g., @$!%*?&)."
      );
      isValid = false;
    }

    return isValid;
  },
  getErrors: () => {
    return { errors };
  },
};
