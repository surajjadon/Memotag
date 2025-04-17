import React, { useState } from 'react';
import { Sun, Moon, Brain, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handlePlayVideo: () => void;
}


const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Left — Logo */}
          <div className="flex items-center justify-between h-20 space-x-10">
            <div className="flex items-center">
              <a href="#home">
                <Brain className="h-9 w-9 text-primary-600 dark:text-primary-400" />
              </a>
              <span className="ml-2 text-2xl font-extrabold text-gray-900 dark:text-white">
                <a href="#home">MemoTag</a>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6 text-base font-medium text-gray-700 dark:text-gray-200">
              <a href="#problem" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Problem</a>
              <a href="#solution" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Solution</a>
              <a href="#traction" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Tracking</a>
              <a href="#cta" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Get Started</a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center md:space-x-4 space-x-2">
            <a
              href="#auth"
              className="hidden md:inline-block bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-xl text-base font-semibold transition-colors"
            >
              Sign in / Sign up
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-6 w-6 text-primary-600 dark:text-primary-400" /> : <Moon className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              {menuOpen ? <X className="h-6 w-6 text-primary-600 dark:text-primary-400" /> : <Menu className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 pt-2 space-y-2 text-left text-base font-medium text-gray-800 dark:text-gray-200">
          <a href="#problem" className="block hover:text-primary-500 dark:hover:text-primary-400">Problem</a>
          <a href="#solution" className="block hover:text-primary-500 dark:hover:text-primary-400">Solution</a>
          <a href="#tracking" className="block hover:text-primary-500 dark:hover:text-primary-400">Tracking</a>
          <a href="#cta" className="block hover:text-primary-500 dark:hover:text-primary-400">Get Started</a>
          <a
            href="#auth"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg mt-2 transition-colors"
          >
            Sign in / Sign up
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;