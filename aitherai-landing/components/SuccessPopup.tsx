'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      // Auto-close after 10 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-lg mx-4">
              <div className="relative bg-gradient-to-br from-cosmic-dark via-cosmic-medium to-purple-primary/20 rounded-2xl overflow-hidden shadow-2xl border border-purple-primary/30">
                {/* Liquid Paint Animation for popup */}
                <div className="absolute inset-0 overflow-hidden opacity-50">
                  <div className="liquid-paint-popup liquid-paint-popup-1" />
                  <div className="liquid-paint-popup liquid-paint-popup-2" />
                  <div className="liquid-paint-popup liquid-paint-popup-3" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 text-center">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold mb-4"
                  >
                    <span className="gradient-text">Success!</span>
                  </motion.h2>
                  
                  {/* Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-lg mb-2"
                  >
                    Your project details have been forwarded to AitherAI.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 mb-6"
                  >
                    We&apos;ll get in touch with you within 24 hours to discuss your vision and next steps.
                  </motion.p>
                  
                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-purple-primary to-purple-secondary text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    Got it!
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
