// client/src/hooks/useSignupForm.js
import { useState } from "react";

export const useSignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.length >= 15) {
      return { isValid: true, message: "" };
    }

    if (password.length >= 8) {
      const hasNumber = /\d/.test(password);
      const hasLowercase = /[a-z]/.test(password);

      if (hasNumber && hasLowercase) {
        return { isValid: true, message: "" };
      } else {
        return {
          isValid: false,
          message:
            "Password must contain at least one number and one lowercase letter",
        };
      }
    }

    return {
      isValid: false,
      message:
        "Password must be at least 15 characters OR at least 8 characters with a number and lowercase letter",
    };
  };

  const handlePasswordChange = (password) => {
    const validation = validatePassword(password);
    setPasswordError(validation.isValid ? "" : validation.message);
    setFormData({ ...formData, password });
    return validation.isValid;
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
    setPasswordError("");
    setFeedback("");
  };

  return {
    formData,
    loading,
    feedback,
    passwordError,
    validatePassword,
    handlePasswordChange,
    handleFieldChange,
    resetForm,
    setLoading,
    setFeedback,
    setFormData,
  };
};
