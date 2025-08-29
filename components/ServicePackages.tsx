
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type Package = {
  name: string;
  price: string;
  description: string;
  features: string[];
  gradient: string;
  popular?: boolean;
};

const packages: Package[] = [
  {
    name: 'Build-Only',
    price: '$1,200',
    description: 'One-time build. You manage content and hosting.',
    features: [
      'Up to 5-page custom website',
      'Mobile-responsive design',
      'Essential SEO best practices',
      'Strapi CMS with a WordPress-simple admin panel',
      'Launch assistance and handoff documentation',
      'You own and manage hosting & updates'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Managed Starter',
    price: '$1,500',
    description: 'Most popular. We build and manage for your first year.',
    features: [
      'Up to 8–10 custom pages',
      'Performance + on-page SEO optimization',
      'Strapi CMS with a WordPress-simple admin panel',
      'Managed hosting, backups, and monitoring (12 months)',
      'Basic CRM and marketing integrations',
      'Content updates and support included (12 months)'
    ],
    gradient: 'from-teal-500 to-cyan-600',
    popular: true
  },
  {
    name: 'Professional',
    price: '$2,500',
    description: 'Advanced functionality and integrations for growth.',
    features: [
      '15+ pages with premium animations',
      'E‑commerce or booking flows (Stripe/Checkout)',
      'Custom API and third‑party integrations',
      'Strapi CMS with roles/permissions and localization ready',
      'Analytics, dashboards, and conversion tracking',
      '12 months managed hosting, backups, and priority support'
    ],
    gradient: 'from-violet-500 to-fuchsia-600'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Fully bespoke solution with security, scale, and SLAs.',
    features: [
      'Unlimited pages and custom workflows',
      'Dashboards, portals, and internal tools',
      'SSO, advanced security, and audit logging',
      'Strapi CMS enterprise setup with custom content modeling',
      'High‑availability hosting, CI/CD, and performance SLAs',
      'Dedicated success manager and roadmap planning'
    ],
    gradient: 'from-gold-accent to-orange-500'
  }
];

export default function ServicePackages() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="services" className="section-padding bg-cosmic-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Website Packages
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect package for your business needs. All packages include 
            100% custom development with no templates or page builders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <div className="card h-full flex flex-col relative">
                <div className={`relative h-2 bg-gradient-to-r ${pkg.gradient} rounded-t-lg -mt-6 -mx-6 mb-6`} />

                {pkg.popular && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-purple-primary text-white shadow">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-extrabold text-white">{pkg.price}</span>
                  <span className="text-sm text-gray-400">one-time build</span>
                </div>
                <p className="text-gray-400 mb-6">{pkg.description}</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-purple-primary mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'bg-gradient-to-r ' + pkg.gradient + ' text-white shadow-lg'
                      : 'bg-cosmic-medium text-purple-primary border border-purple-primary/30'
                  }`}
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="space-y-2">
            <p className="text-gray-400 text-lg">
              All packages include Strapi CMS with a WordPress-simple admin panel for easy content updates.
            </p>
            <p className="text-gray-400 text-sm">
              Renewal after 12 months: managed care plans available at <span className="text-white font-semibold">$75–$125/month</span> for hosting, backups, monitoring, and support. Build-Only excludes management.
            </p>
            <p className="text-gray-400 text-sm">
              Need something unique? <span className="text-purple-primary font-semibold">Contact us</span> for a custom quote.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">Frequently Asked Questions</h3>
          <div className="max-w-4xl mx-auto space-y-3">
            {[
              {
                q: 'How easy is it to update website content?',
                a:
                  'Very easy. Every site includes Strapi CMS with a WordPress-simple admin panel. You can add, edit, and schedule content without touching code. We also include training and a clear handover guide.'
              },
              {
                q: 'What happens after you build my website?',
                a:
                  'We provide a professional handover: admin access, training, documentation, and best-practice guidelines. If you choose a managed plan, we handle hosting, backups, monitoring, and routine updates for 12 months, with renewal options at $75–$125/month.'
              },
              {
                q: 'How is this different from WordPress or Wix?',
                a:
                  'Your site is custom-built for performance and flexibility—no themes or plugin bloat. Strapi CMS gives you a clean, secure editing experience while we keep the frontend fast, modern, and tailored to your business.'
              },
              {
                q: 'Can I switch between packages later?',
                a:
                  'Yes. You can upgrade to add features or managed services anytime. We’ll review your goals and provide a smooth transition plan so you only pay for what you need.'
              }
            ].map((item, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between text-left px-6 py-4 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-white font-semibold">{item.q}</span>
                  <span className="text-purple-primary">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 -mt-1">
                    <p className="text-gray-300">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
