'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const packages = [
  {
    name: 'STARTER PACKAGE',
    description: 'Perfect for small businesses and startups',
    features: [
      '5-page custom website',
      'Mobile-responsive design',
      'Basic SEO optimization',
      'Contact forms and integrations',
      '3 months support included'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'PROFESSIONAL PACKAGE',
    description: 'Ideal for growing businesses',
    features: [
      '10-page custom website',
      'Advanced functionality and animations',
      'E-commerce capabilities',
      'CRM and marketing integrations',
      '6 months support and optimization'
    ],
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    name: 'ENTERPRISE PACKAGE',
    description: 'Complete solution for established companies',
    features: [
      'Unlimited pages and functionality',
      'Custom dashboards and portals',
      'Advanced integrations and APIs',
      'Performance optimization',
      '12 months support and management'
    ],
    gradient: 'from-gold-accent to-orange-500'
  }
];

export default function ServicePackages() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div className="card h-full flex flex-col">
                <div className={`h-2 bg-gradient-to-r ${pkg.gradient} rounded-t-lg -mt-6 -mx-6 mb-6`} />
                
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
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
                  Learn More
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
          <p className="text-gray-400 text-lg">
            All packages are fully customizable to meet your specific needs. 
            <span className="text-purple-primary font-semibold"> Contact us</span> for a personalized quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
