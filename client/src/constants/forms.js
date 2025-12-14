// client/src/constants/forms.js
export const SIGNUP_FORM_INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const SIGNUP_FORM_VALIDATION = {
  password: (password) => {
    if (password.length >= 15) return { isValid: true, message: "" };

    if (password.length >= 8) {
      const hasNumber = /\d/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      if (hasNumber && hasLowercase) return { isValid: true, message: "" };
      return {
        isValid: false,
        message:
          "Password must contain at least one number and one lowercase letter",
      };
    }

    return {
      isValid: false,
      message:
        "Password must be at least 15 characters OR at least 8 characters with a number and lowercase letter",
    };
  },
};
