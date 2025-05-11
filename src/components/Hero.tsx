
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      
      {/* Hero Background Image - Optimized with WebP */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&w=1200&q=75&fm=webp')", 
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-white text-center">
        <h2 className="text-xl md:text-2xl mb-3 font-light animate-fade-in">{t('hero.welcome')}</h2>
        <h1 className="font-playfair text-5xl md:text-7xl mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>Palmera Estudio</h1>
        <p className="text-xl md:text-2xl mb-8 italic font-light max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {t('hero.tagline')}
        </p>
        <a 
          href="#booking" 
          className="inline-block bg-palmera-olive text-white px-8 py-3 rounded hover:bg-opacity-90 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          {t('hero.cta')}
        </a>
      </div>
    </section>
  );
};

export default Hero;
