import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">BlueForge</p>
          <p className="text-sm text-slate-400">We are building a beautiful world together.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-400">
          <Link to="/contact" className="hover:text-white">
            Contact us
          </Link>
          <a href="mailto:hello@novastudio.dev" className="hover:text-white">
            hello@novastudio.dev
          </a>
          <span>© {new Date().getFullYear()} BlueForge.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
