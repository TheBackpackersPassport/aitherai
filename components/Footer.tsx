'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-cosmic-dark border-t border-purple-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:items-start">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/admin/login" className="inline-block mx-auto md:mx-0">
              <Image
                src="/images/Aitherai .dev.png"
                alt="AitherAI Logo"
                width={150}
                height={60}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              We create completely custom websites tailored to your business. 
              No templates, no generic builders, no limitations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-purple-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-gray-400 hover:text-purple-primary transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-purple-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <p className="text-gray-400 flex items-center justify-center md:justify-start">
                <svg className="w-5 h-5 mr-2 text-purple-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">scott@aitherai.dev</span>
              </p>
              <p className="text-gray-500 text-sm">
                We respond to all inquiries within 24 hours
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-primary/10 flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2024 AitherAI. All rights reserved.
          </p>
          
          {/* Hidden Admin Link */}
          <div className="mt-4 md:mt-0">
            <Link 
              href="/admin/login" 
              className="text-cosmic-medium hover:text-purple-primary/30 transition-colors text-xs"
              aria-label="Admin"
            >
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
