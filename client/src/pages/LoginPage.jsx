import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback("");
    try {
      const response = await API.post("/auth/login", formData);
      login(response.data.token, response.data.user);
      setFeedback("Logged in successfully! Redirecting...");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      setFeedback(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Desktop Layout - Diagonal Split */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Form (50%) */}
        <div className="w-1/2 flex items-center justify-center px-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <Link to="/" className="inline-block">
                <span className="text-2xl font-bold text-white">BlueForge</span>
              </Link>
              <p className="text-slate-400 mt-2">Sign in to your account</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-700 bg-slate-800 text-primary-400"
                    />
                    <span className="ml-2 text-slate-300">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-primary-400 hover:text-primary-300"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-primary-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-primary-400 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-slate-800"></div>
                <span className="mx-4 text-sm text-slate-500">
                  Or continue with
                </span>
                <div className="flex-1 border-t border-slate-800"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    /* Add Google OAuth logic */
                  }}
                  className="rounded-2xl border border-slate-700 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-primary-400"
                >
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => {
                    /* Add GitHub OAuth logic */
                  }}
                  className="rounded-2xl border border-slate-700 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-primary-400"
                >
                  GitHub
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
                  >
                    Sign Up →
                  </Link>
                </p>
              </div>
            </div>

            {feedback && (
              <div
                className={`mt-6 text-center text-sm ${
                  feedback.includes("success")
                    ? "text-green-400"
                    : "text-rose-400"
                }`}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Photo with Diagonal Boundary (50%) */}
        <div className="w-1/2 relative overflow-hidden">
          {/* Diagonal Line Container */}
          <div className="absolute inset-0">
            {/* Photo */}
            <img
              src="../../public/F@liuyan98112.jpg"
              alt="Developer workspace"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-slate-900/50 to-transparent"></div>

            {/* 80-degree Diagonal Line Boundary */}
            <div
              className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-primary-400/80 via-primary-300 to-primary-500/80"
              style={{
                transform: "rotate(80deg)",
                transformOrigin: "top left",
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
              }}
            ></div>
          </div>

          {/* Welcome Text */}
          <div className="absolute bottom-16 right-12 max-w-xs text-right">
            <h3 className="text-3xl font-bold text-white mb-3">
              Welcome Back!
            </h3>
            <p className="text-slate-200 text-lg">
              Continue your journey with BlueForge. Build amazing things
              together.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex items-center justify-center px-4 py-12 bg-slate-950">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-white">BlueForge</span>
            </Link>
            <p className="text-slate-400 mt-2">Sign in to your account</p>
          </div>

          {/* Same form as desktop but without diagonal split */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

            {/* Same form content as above */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* ... same form fields ... */}
            </form>

            {/* ... rest of mobile form ... */}
          </div>
        </div>

        {/* Mobile Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src="../../public/F@liuyan98112.jpg"
            alt="Developer workspace"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
