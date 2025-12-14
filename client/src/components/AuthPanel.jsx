import React, { useState } from "react";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useSignupForm } from "../hooks/useSignupForm"; // ADD THIS IMPORT

const AuthPanel = () => {
  const { login } = useAuth();
  const [mode, setMode] = useState("login");

  // REPLACE signupForm state with hook:
  const {
    formData, // Use this instead of signupForm
    loading,
    feedback,
    passwordError,
    handlePasswordChange,
    handleFieldChange,
    resetForm,
    setLoading,
    setFeedback,
  } = useSignupForm();

  // Keep loginForm separate (different structure)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback("");
    try {
      // ✅ FIXED LINE
      const response = await API.post("/api/auth/login", loginForm);
      login(response.data.token, response.data.user);
      setFeedback("Logged in! Redirecting to your profile...");
    } catch (error) {
      setFeedback(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    // Use hook's validation
    const passwordValidation = useSignupForm().validatePassword(
      formData.password
    );
    if (!passwordValidation.isValid) {
      setFeedback(passwordValidation.message);
      return;
    }

    setLoading(true);
    setFeedback("");
    try {
      // ✅ FIXED LINE - use formData not signupForm
      await API.post("/api/auth/signup", formData);
      setFeedback(
        "Signup created. Check your inbox for the verification link."
      );
      resetForm();
    } catch (error) {
      setFeedback(error.response?.data?.message || "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    if (!formData.email) {
      setFeedback("Please provide email to continue with OAuth");
      return;
    }
    setLoading(true);
    setFeedback("");
    try {
      const response = await API.post(`/auth/oauth/${provider}`, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      login(response.data.token, response.data.user);
      setFeedback(`${provider} login succeeded!`);
    } catch (error) {
      setFeedback(error.response?.data?.message || `Could not use ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-900/60 backdrop-blur">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMode("login")}
          className={`text-sm font-semibold uppercase tracking-[0.2em] ${
            mode === "login" ? "text-white" : "text-slate-400"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`text-sm font-semibold uppercase tracking-[0.2em] ${
            mode === "signup" ? "text-white" : "text-slate-400"
          }`}
        >
          Sign Up
        </button>
      </div>
      {mode === "login" ? (
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            value={loginForm.email}
            onChange={(event) =>
              setLoginForm({ ...loginForm, email: event.target.value })
            }
          />
          <input
            type="password"
            required
            placeholder="Password"
            className={`w-full rounded-2xl border ${
              passwordError ? "border-rose-500" : "border-slate-700"
            } bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none`}
            value={formData.password}
            onChange={(event) => {
              handleFieldChange("password", event.target.value);
            }}
          />
          {passwordError && (
            <p className="text-xs text-rose-400 mt-1">{passwordError}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary-500 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-primary-400 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Log In"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder="First Name"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
              value={formData.firstName}
              onChange={(event) =>
                handleFieldChange("firstName", event.target.value)
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
              value={formData.lastName}
              onChange={(event) =>
                handleFieldChange("lastName", event.target.value)
              }
            />
          </div>
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            value={formData.email}
            onChange={(event) => handleFieldChange("email", event.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            value={formData.password}
            onChange={(event) =>
              handleFieldChange("password", event.target.value)
            }
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary-500 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-primary-400 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <div className="space-y-2 text-[0.65rem] uppercase tracking-[0.4em] text-slate-500">
            <span>Or continue with</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleOAuth("google")}
                className="flex-1 rounded-2xl border border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-primary-400"
              >
                Gmail
              </button>
              <button
                type="button"
                onClick={() => handleOAuth("github")}
                className="flex-1 rounded-2xl border border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-primary-400"
              >
                GitHub
              </button>
            </div>
          </div>
        </form>
      )}
      {feedback && <p className="mt-4 text-xs text-rose-300">{feedback}</p>}
    </div>
  );
};

export default AuthPanel;
