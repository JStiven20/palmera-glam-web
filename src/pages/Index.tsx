
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Booking from '../components/Booking';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { LanguageProvider } from '../contexts/LanguageContext';
import { DatabaseProvider } from '../contexts/DatabaseContext';

const Index: React.FC = () => {
  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (position.top < window.innerHeight - 100) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <LanguageProvider>
      <DatabaseProvider>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Booking />
            <Gallery />
            <Reviews />
            <Contact />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </DatabaseProvider>
    </LanguageProvider>
  );
};

export default Index;
