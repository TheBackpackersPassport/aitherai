'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cosmic-dark via-cosmic-medium to-purple-primary/20 relative overflow-hidden">
        {/* Liquid Paint Animation Container */}
        <div className="liquid-paint-container">
          <div className="liquid-paint liquid-paint-1" />
          <div className="liquid-paint liquid-paint-2" />
          <div className="liquid-paint liquid-paint-3" />
          <div className="liquid-paint liquid-paint-4" />
          <div className="liquid-shimmer" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Image
              src="/images/Aitherai .dev.png"
              alt="AitherAI Logo"
              width={400}
              height={160}
              className="mx-auto mb-8"
              priority
            />
            <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
            <p className="text-gray-300 mb-8">Select an HTML file to manage</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full"
          >
            {/* HTML Files will be added here */}
            <div className="bg-cosmic-medium/50 backdrop-blur-sm border border-purple-primary/30 rounded-xl p-6 hover:border-purple-primary/50 transition-all duration-300">
              <h3 className="text-white font-semibold mb-2">Coming Soon</h3>
              <p className="text-gray-400 text-sm">HTML files will be displayed here</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <Link
              href="/"
              className="text-purple-300 hover:text-purple-light transition-colors"
            >
              ← Back to website
            </Link>
          </motion.div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-dark via-cosmic-medium to-purple-primary/20 relative overflow-hidden">
      {/* Liquid Paint Animation Container */}
      <div className="liquid-paint-container">
        <div className="liquid-paint liquid-paint-1" />
        <div className="liquid-paint liquid-paint-2" />
        <div className="liquid-paint liquid-paint-3" />
        <div className="liquid-paint liquid-paint-4" />
        <div className="liquid-shimmer" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Hero Logo */}
          <div className="mb-8">
            <Image
              src="/images/Aitherai .dev.png"
              alt="AitherAI Logo"
              width={400}
              height={160}
              className="mx-auto"
              priority
            />
          </div>

          {/* Login Form */}
          <div className="bg-cosmic-medium/50 backdrop-blur-sm border border-purple-primary/30 rounded-xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Admin Access</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary transition-colors"
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 hover:shadow-xl hover:scale-105'
                }`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6">
              <Link
                href="/"
                className="text-purple-300 hover:text-purple-light transition-colors text-sm"
              >
                ← Back to website
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
