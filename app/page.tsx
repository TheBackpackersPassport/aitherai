import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ServicePackages from '@/components/ServicePackages';
import ProcessSection from '@/components/ProcessSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-cosmic-dark relative overflow-hidden">
      {/* Global Liquid Paint Background - Covers Entire Page */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-dark via-cosmic-medium to-cosmic-dark" />
        <div className="liquid-paint-container">
          <div className="liquid-paint liquid-paint-1" />
          <div className="liquid-paint liquid-paint-2" />
          <div className="liquid-paint liquid-paint-3" />
          <div className="liquid-paint liquid-paint-4" />
          <div className="liquid-paint liquid-paint-5" />
          <div className="liquid-shimmer" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <WhyChooseSection />
        <ServicePackages />
        <ProcessSection />
        <ContactForm />
        <Footer />
      </div>
    </main>
  );
}
