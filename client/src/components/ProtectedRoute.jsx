import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If no user, go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, show the protected page
  return children;
};

export default ProtectedRoute;
