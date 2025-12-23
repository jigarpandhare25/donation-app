
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/donate', label: 'Donate', icon: 'fa-hand-holding-heart' },
    { path: '/find', label: 'Find Food', icon: 'fa-search' },
    { path: '/ngos', label: 'NGOs', icon: 'fa-building-ngo' },
    { path: '/impact', label: 'Impact', icon: 'fa-chart-line' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <i className="fas fa-utensils text-lg"></i>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            ShareBite
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 flex items-center gap-2 ${
                location.pathname === link.path ? 'text-emerald-600' : 'text-slate-600'
              }`}
            >
              <i className={`fas ${link.icon}`}></i>
              {link.label}
            </Link>
          ))}
        </div>

        <button className="md:hidden p-2 text-slate-600">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
