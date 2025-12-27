import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Members', path: '/members' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-white/5 bg-[#0f0518]/70 h-24">
      <div className="container h-full mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 text-3xl font-bold tracking-tighter hover:opacity-80 transition-opacity group">
          <div className="p-2 rounded-xl bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors">
            <Rocket className="text-pink-500 transform group-hover:-translate-y-1 transition-transform" size={32} />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-pink-400 font-extrabold"
            style={{ backgroundSize: '200% auto' }}>
            Mathrix
          </span>
        </NavLink>

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
          <a href="/contact" className="ml-6 px-7 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-base font-bold transition-all hover:scale-105 active:scale-95 text-pink-300 hover:text-pink-200 hover:border-pink-500/30 shadow-lg shadow-pink-500/10">
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
