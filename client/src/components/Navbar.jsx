import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 shadow-lg shadow-slate-900 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold uppercase tracking-wide text-white"
        >
          <span className="text-primary-400">Nova</span>
          <span className="text-slate-200">Studio</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-wider text-slate-200">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-white underline decoration-primary-400"
                  : "hover:text-primary-300"
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              if (user) {
                navigate("/profile");
              } else {
                navigate("/login");
              }
            }}
            className="uppercase hover:text-primary-300 text-sm font-medium tracking-wider"
          >
            Profile
          </button>
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline decoration-primary-400"
                  : "hover:text-primary-300"
              }
            >
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-slate-200">
                Hello, {user.firstName || user.email}
              </span>
              <button
                onClick={logout}
                className="rounded-full border border-primary-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-200 transition hover:bg-primary-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                    isActive
                      ? "bg-primary-500 text-slate-950"
                      : "border border-slate-700 text-slate-200 hover:border-primary-400 hover:text-primary-300"
                  }`
                }
              >
                Login
              </NavLink>

              {/* Sign Up Button */}
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                    isActive
                      ? "bg-primary-500 text-slate-950"
                      : "bg-primary-500 text-slate-950 hover:bg-primary-400"
                  }`
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
