'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SuccessPopup from './SuccessPopup';
import { websitePackages } from '../lib/packages';

interface FormData {
  fullName: string;
  email: string;
  companyName?: string;
  phone?: string;
  howDidYouHear: string;
  packageInterest: string;
  businessType?: string;
  hasWebsite: string;
  timeline: string;
  primaryGoal?: string;
  features: string[];
  vision?: string;
  budget: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setShowSuccessPopup(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const featureOptions = [
    'E-commerce/Online sales',
    'Lead generation',
    'Brand showcase',
    'Client portal',
    'Booking system',
    'Blog/Content management',
    'Integration with existing systems'
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-cosmic-dark to-cosmic-medium">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your Custom Website?
          </h2>
          <p className="text-xl text-gray-300">
            Tell us about your project and we&apos;ll create a personalized proposal for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card"
        >
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-400 text-center">
                Whether you&apos;re looking for a custom website, e-commerce solutions, AI integration, or other features, we&apos;re here to help bring your vision to life within 24 hours.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary transition-colors"
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Let&apos;s Build Something Amazing! Invalid email address"
                    }
                  })}
                  type="email"
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary transition-colors"
                  placeholder="john@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  {...register('companyName')}
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary transition-colors"
                  placeholder="Your Company Inc."
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* How did you hear */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  How did you hear about AitherAI?
                </label>
                <select
                  {...register('howDidYouHear')}
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white focus:outline-none focus:border-purple-primary transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral from friend/colleague</option>
                  <option value="publication">Industry publication</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Package Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Which package interests you?
                </label>
                <select
                  {...register('packageInterest')}
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white focus:outline-none focus:border-purple-primary transition-colors"
                >
                  <option value="">Select a package</option>
                  {websitePackages.map((pkg) => (
                    <option key={pkg.name} value={pkg.name}>
                      {pkg.name} — {pkg.price}
                    </option>
                  ))}
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What type of business are you in?
                </label>
                <input
                  {...register('businessType')}
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary transition-colors"
                  placeholder="e.g., E-commerce, SaaS, Consulting"
                />
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Whether you&apos;re looking for a complete website overhaul, custom design, or AI integration, what&apos;s your ideal timeline for launch?
                </label>
                <select
                  {...register('timeline')}
                  className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white focus:outline-none focus:border-purple-primary transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="1month">Within 1 month</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6+months">6+ months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Has Website */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Do you currently have a website?
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    {...register('hasWebsite')}
                    type="radio"
                    value="yes"
                    className="mr-2 text-purple-primary focus:ring-purple-primary"
                  />
                  <span className="text-gray-300">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('hasWebsite')}
                    type="radio"
                    value="no"
                    className="mr-2 text-purple-primary focus:ring-purple-primary"
                  />
                  <span className="text-gray-300">No</span>
                </label>
              </div>
            </div>

            {/* Primary Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What&apos;s the primary goal of your new website?
              </label>
              <textarea
                {...register('primaryGoal')}
                rows={3}
                className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary transition-colors"
                placeholder="e.g., Increase online sales, generate more leads, establish brand presence..."
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What features are most important to you?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {featureOptions.map((feature) => (
                  <label key={feature} className="flex items-center">
                    <input
                      {...register('features')}
                      type="checkbox"
                      value={feature}
                      className="mr-2 text-purple-primary focus:ring-purple-primary"
                    />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tell us about your vision and requirements
              </label>
              <textarea
                {...register('vision')}
                rows={5}
                className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-primary transition-colors"
                placeholder="Describe your ideal website, any specific features you need, design preferences, or other requirements..."
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estimated budget range
              </label>
              <select
                {...register('budget')}
                className="w-full px-4 py-3 bg-cosmic-dark/50 border border-purple-primary/30 rounded-lg text-white focus:outline-none focus:border-purple-primary transition-colors"
              >
                <option value="">Select budget range</option>
                <option value="1-5k">$1,000 - $5,000</option>
                <option value="5-10k">$5,000 - $10,000</option>
                <option value="10-25k">$10,000 - $25,000</option>
                <option value="25k+">$25,000+</option>
                <option value="discuss">Prefer to discuss</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-semibold rounded-lg transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-xl hover:scale-105 hover:from-teal-600 hover:to-cyan-700'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send My Project Details'}
            </button>
          </form>
        </motion.div>
      </div>
      
      {/* Success Popup */}
      <SuccessPopup 
        isOpen={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
      />
    </section>
  );
}
