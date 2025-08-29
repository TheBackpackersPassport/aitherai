'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discovery Consultation',
    description: 'We start with a deep dive into your business, understanding your goals, target audience, and unique value proposition.',
    points: [
      'Understand your business and goals',
      'Define project scope and requirements',
      'Discuss timeline and expectations'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description: 'We create a comprehensive roadmap for your project, including wireframes, user flows, and technical architecture.',
    points: [
      'Create detailed project roadmap',
      'Design wireframes and user flow',
      'Technical architecture planning'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Custom Development',
    description: 'Our AI-powered development process brings your vision to life with clean, efficient code and stunning design.',
    points: [
      'AI-powered development process',
      'Regular progress updates',
      'Quality testing throughout'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Launch & Support',
    description: 'We handle deployment and deliver a professional, comprehensive handover—CMS training, complete documentation, performance monitoring setup, and clear options for ongoing support.',
    points: [
      'Professional deployment & performance monitoring setup',
      'Strapi CMS training for your team',
      'Complete documentation & handover package',
      'Ongoing support options and optimization'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-gradient-to-b from-cosmic-medium to-cosmic-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How We Work With You
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven 4-step process ensures your project is delivered on time, 
            on budget, and exceeds your expectations.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-primary via-purple-secondary to-gold-accent transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-cosmic-medium/50 backdrop-blur-sm border border-purple-primary/20 rounded-xl p-6 hover:border-purple-primary/50 transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 left-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    STEP {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-primary/20 to-purple-secondary/20 rounded-lg flex items-center justify-center text-purple-light mb-4 mt-2">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{step.description}</p>

                  {/* Points */}
                  <ul className="space-y-2">
                    {step.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <svg className="w-4 h-4 text-gold-accent mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to start your custom website project?
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-teal-600 hover:to-cyan-700"
          >
            Start Your Project Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
