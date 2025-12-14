// client/src/services/authService.js
import API from "./api";

export const signup = async (userData) => {
  try {
    // ✅ Only defined once, used everywhere
    const response = await API.post("/api/auth/signup", userData);
    return response.data;
  } catch (error) {
    // Consistent error handling
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const login = async (credentials) => {
  const response = await API.post("/api/auth/login", credentials);
  return response.data;
};
