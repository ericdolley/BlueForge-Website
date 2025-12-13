import React, { useState } from "react";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const AuthPanel = () => {
  const { login } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    // Check if password is at least 15 characters
    if (password.length >= 15) {
      return { isValid: true, message: "" };
    }

    // Check if password is at least 8 characters with a number and lowercase letter
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

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback("");
    try {
      const response = await API.post("/auth/login", loginForm);
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

    // Validate password before submission
    const passwordValidation = validatePassword(signupForm.password);
    if (!passwordValidation.isValid) {
      setFeedback(passwordValidation.message);
      return;
    }

    setLoading(true);
    setFeedback("");
    try {
      await API.post("/auth/signup", signupForm);
      setFeedback(
        "Signup created. Check your inbox for the verification link."
      );
      setSignupForm({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      setFeedback(error.response?.data?.message || "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    if (!signupForm.email) {
      setFeedback("Please provide email to continue with OAuth");
      return;
    }
    setLoading(true);
    setFeedback("");
    try {
      const response = await API.post(`/auth/oauth/${provider}`, {
        email: signupForm.email,
        firstName: signupForm.firstName,
        lastName: signupForm.lastName,
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
            value={signupForm.password}
            onChange={(event) => {
              setSignupForm({ ...signupForm, password: event.target.value });
              const validation = validatePassword(event.target.value);
              setPasswordError(validation.isValid ? "" : validation.message);
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
              value={signupForm.firstName}
              onChange={(event) =>
                setSignupForm({ ...signupForm, firstName: event.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
              value={signupForm.lastName}
              onChange={(event) =>
                setSignupForm({ ...signupForm, lastName: event.target.value })
              }
            />
          </div>
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            value={signupForm.email}
            onChange={(event) =>
              setSignupForm({ ...signupForm, email: event.target.value })
            }
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
            value={signupForm.password}
            onChange={(event) =>
              setSignupForm({ ...signupForm, password: event.target.value })
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
