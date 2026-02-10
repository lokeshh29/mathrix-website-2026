import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Schedule', path: '/schedule' },

    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Members', path: '/members' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-white/5 bg-[#0f0518]/70 h-24">
      <div className="container h-full mx-auto flex items-center justify-between px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <NavLink to="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-all flex items-center justify-center shadow-lg group-hover:shadow-purple-500/20">
              <img src={logo} alt="Mathrix Logo" className="w-full h-full object-contain p-1" />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 font-tech uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              Mathrix
            </span>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-base font-semibold transition-all duration-300 relative py-1 hover:text-white tracking-wide ${isActive ? 'text-pink-400' : 'text-gray-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <a href="/events" className="ml-6 px-7 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-base font-bold transition-all hover:scale-105 active:scale-95 text-pink-300 hover:text-pink-200 hover:border-pink-500/30 shadow-lg shadow-pink-500/10">
            Register Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0f0518]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="flex flex-col p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all text-sm font-medium ${isActive
                      ? 'bg-pink-500/10 text-pink-300 border border-pink-500/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center justify-between">
                    {item.name}
                    {item.name === 'Contact' && <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full">Register</span>}
                  </div>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
