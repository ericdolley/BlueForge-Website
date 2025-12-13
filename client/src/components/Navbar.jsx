import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 shadow-lg shadow-slate-900 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold uppercase tracking-wide text-white">
          <span className="text-primary-400">Nova</span>
          <span className="text-slate-200">Studio</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-wider text-slate-200">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'text-white underline decoration-primary-400' : 'hover:text-primary-300'
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? 'text-white underline decoration-primary-400' : 'hover:text-primary-300'
            }
          >
            Profile
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? 'text-white underline decoration-primary-400' : 'hover:text-primary-300'
              }
            >
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-slate-200">Hello, {user.firstName || user.email}</span>
              <button
                onClick={logout}
                className="rounded-full border border-primary-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-200 transition hover:bg-primary-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="rounded-full bg-primary-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-primary-400"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
