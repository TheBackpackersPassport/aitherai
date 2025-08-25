'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      
      if (!data.isLoggedIn) {
        router.push('/admin/login');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cosmic-dark to-cosmic-medium flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-dark to-cosmic-medium">
      {/* Header */}
      <div className="bg-cosmic-dark/50 backdrop-blur-sm border-b border-purple-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-primary to-purple-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <h1 className="text-2xl font-bold text-white">AitherAI Admin Tools</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-primary/20 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Business Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Invoice Generator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card hover:border-purple-primary/70 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Invoice Generator</h3>
                  <p className="text-sm text-gray-400">&quot;Excellent service!&quot; &quot;Very professional&quot; &quot;Highly recommend&quot;</p>
                  <p className="text-gray-400 text-sm mb-4">Create professional invoices for your clients</p>
                  <div className="bg-cosmic-dark/50 border border-purple-primary/20 rounded-lg p-4">
                    <p className="text-gray-500 text-xs mb-2">Integration Placeholder</p>
                    <p className="text-purple-primary text-sm">Add your invoice HTML file here</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Workflow Builder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card hover:border-purple-primary/70 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-primary to-purple-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Workflow Builder</h3>
                  <p className="text-gray-400 text-sm mb-4">Design and manage your business workflows</p>
                  <div className="bg-cosmic-dark/50 border border-purple-primary/20 rounded-lg p-4">
                    <p className="text-gray-500 text-xs mb-2">Integration Placeholder</p>
                    <p className="text-purple-primary text-sm">Add your workflow HTML file here</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Document Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card hover:border-purple-primary/70 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-accent to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Document Tools</h3>
                  <p className="text-gray-400 text-sm mb-4">Manage contracts, proposals, and documents</p>
                  <div className="bg-cosmic-dark/50 border border-purple-primary/20 rounded-lg p-4">
                    <p className="text-gray-500 text-xs mb-2">Coming Soon</p>
                    <p className="text-purple-primary text-sm">Additional tools can be added here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 card"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Integration Instructions</h3>
            <div className="space-y-3 text-gray-300">
              <p>To integrate your existing HTML tools:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Place your HTML files in the <code className="text-purple-primary bg-cosmic-dark/50 px-2 py-1 rounded">public/tools/</code> directory</li>
                <li>Update the placeholder divs above with iframe elements pointing to your tools</li>
                <li>Example: <code className="text-purple-primary bg-cosmic-dark/50 px-2 py-1 rounded">&lt;iframe src="/tools/invoice.html" className="w-full h-96" /&gt;</code></li>
              </ol>
              <p className="mt-4 text-sm text-gray-400">
                The placeholders above are ready for your custom HTML tools to be integrated seamlessly into this dashboard.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
