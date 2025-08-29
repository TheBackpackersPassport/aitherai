'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8 col-start-2">
            <Link href="#home" className="text-gray-300 hover:text-purple-primary transition-colors">
              Home
            </Link>
            <Link href="#services" className="text-gray-300 hover:text-purple-primary transition-colors">
              Services
            </Link>
            <Link href="#process" className="text-gray-300 hover:text-purple-primary transition-colors">
              Process
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-purple-primary transition-colors">
              Contact
            </Link>
            <Link
              href="#contact"
              className="px-8 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-teal-600 hover:to-cyan-700 min-w-[200px] text-center whitespace-nowrap"
            >
              Start Your Project
            </Link>
          </div>

          {/* Right-side spacer on desktop to keep menu centered */}
          <div className="hidden md:block col-start-3" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white justify-self-end col-start-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-cosmic-medium/95 backdrop-blur-md rounded-lg mt-2 p-4"
          >
            <Link
              href="#home"
              className="block py-2 text-gray-300 hover:text-purple-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#services"
              className="block py-2 text-gray-300 hover:text-purple-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#process"
              className="block py-2 text-gray-300 hover:text-purple-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Process
            </Link>
            <Link
              href="#contact"
              className="block py-2 text-gray-300 hover:text-purple-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="#contact"
              className="block mt-4 px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg text-center hover:from-teal-600 hover:to-cyan-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Your Project
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
