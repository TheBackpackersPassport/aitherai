'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 pb-12 md:pb-16">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Emblem (favicon) */}
          <div className="mb-4">
            <Image
              src="/new-aitherai-mark.png"
              alt="AitherAI Emblem"
              width={600}
              height={600}
              className="mx-auto mb-4 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px]"
              priority
              quality={100}
              style={{
                width: '100%',
                height: 'auto',
                imageRendering: 'auto',
                WebkitFontSmoothing: 'antialiased'
              }}
              sizes="(max-width: 640px) 300px, (max-width: 768px) 340px, (max-width: 1024px) 380px, 420px"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-white">We Create </span>
            <span className="text-teal-300">Completely Custom</span>
            <span className="text-white"> Websites That Convert</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            No Squarespace. No WordPress. No Wix. No templates. 
            Just your vision brought to life with cutting-edge AI-powered development.
          </p>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">100% Custom Design</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">AI-Powered Speed</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Consultation-Driven</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Zero Limitations</span>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-teal-600 hover:to-cyan-700"
            >
              Get Your Custom Quote
            </Link>
            <Link
              href="#process"
              className="px-8 py-4 border-2 border-teal-500 text-teal-400 font-semibold rounded-lg transition-all duration-300 hover:bg-teal-500 hover:text-white"
            >
              See Our Process
            </Link>
          </motion.div>

          {/* Scroll indicator just below CTAs (all viewports) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-4 md:mt-6"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center justify-center"
            >
              <svg
                className="w-5 h-9 md:w-7 md:h-12 text-gray-400"
                viewBox="0 0 24 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="2" width="18" height="32" rx="9" />
                <line x1="12" y1="8" x2="12" y2="12" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
