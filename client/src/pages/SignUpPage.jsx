import React from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useSignupForm } from "../hooks/useSignupForm"; // ADD THIS IMPORT

const SignUpPage = () => {
  const navigate = useNavigate();

  // REPLACE ALL useState HOOKS WITH THIS:
  const {
    formData,
    loading,
    feedback,
    passwordError,
    handlePasswordChange,
    handleFieldChange,
    resetForm,
    setLoading,
    setFeedback,
  } = useSignupForm();

  const handleSignup = async (event) => {
    event.preventDefault();

    // Use the hook's validation
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
      // ✅ FIXED LINE
      await API.post("/api/auth/signup", formData);
      setFeedback(
        "Account created successfully! Please check your email for verification."
      );

      resetForm();

      // Redirect to login after delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setFeedback(
        error.response?.data?.message || "Sign-up failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // In the JSX, UPDATE ALL onChange HANDLERS:
  // FROM: onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
  // TO:   onChange={(e) => handleFieldChange("firstName", e.target.value)}

  // FROM: onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
  // TO:   onChange={(e) => handleFieldChange("lastName", e.target.value)}

  // FROM: onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  // TO:   onChange={(e) => handleFieldChange("email", e.target.value)}

  // FROM: onChange={(e) => handlePasswordChange(e.target.value)}
  // (This one stays the same!)

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
              <p className="text-slate-400 mt-2">Create your account</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>

              <form onSubmit={handleSignup} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleFieldChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleFieldChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>

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
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Create a strong password"
                    className={`w-full rounded-2xl border ${
                      passwordError ? "border-rose-500" : "border-slate-700"
                    } bg-slate-950 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none`}
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                  {passwordError && (
                    <p className="text-xs text-rose-400 mt-2">
                      {passwordError}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-2">
                    Must be at least 15 characters OR 8+ characters with a
                    number and lowercase letter
                  </p>
                </div>

                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    required
                    className="rounded border-slate-700 bg-slate-800 text-primary-400"
                  />
                  <span className="ml-2 text-slate-300">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-primary-400 hover:text-primary-300"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-primary-400 hover:text-primary-300"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-primary-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-primary-400 disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-slate-800"></div>
                <span className="mx-4 text-sm text-slate-500">
                  Or sign up with
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
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
                  >
                    Login →
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
        <div className="w-1/2 relative">
          {/* Photo Container - This is the trick for rotation */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Diagonal Line Boundary - FIXED ROTATION */}
            <div
              className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-primary-400 via-primary-300 to-primary-500 z-20"
              style={{
                transform: "rotate(80deg)",
                transformOrigin: "top left",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
              }}
            ></div>

            {/* Photo with Offset to Account for Diagonal Line */}
            <div
              className="absolute inset-0"
              style={{
                left: "2px", // Push photo right to account for diagonal line
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-slate-900/50 to-transparent"></div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="absolute bottom-16 right-12 max-w-xs text-right z-10">
            <h3 className="text-3xl font-bold text-white mb-3">
              Join Our Team!
            </h3>
            <p className="text-slate-200 text-lg">
              Start building amazing digital experiences with BlueForge today.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex items-center justify-center px-4 py-12 bg-slate-950">
        {/* Mobile content (same onChange updates) */}
      </div>
    </div>
  );
};

export default SignUpPage;
