
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.services') },
    { href: '#booking', label: t('nav.booking') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white bg-opacity-90 backdrop-blur-sm shadow-sm py-2' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <span className="font-playfair text-2xl sm:text-3xl font-semibold">Palmera</span>
          <span className="font-sans text-xs sm:text-sm tracking-widest ml-2 mt-1">ESTUDIO</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm hover:text-palmera-olive transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={toggleLanguage}
            className="ml-4 px-2 py-1 text-sm border border-palmera-olive text-palmera-olive rounded hover:bg-palmera-olive hover:text-white transition-colors duration-300"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-palmera-olive p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <g>
                <path d="M18 6L6 18"></path>
                <path d="M6 6L18 18"></path>
              </g>
            ) : (
              <g>
                <path d="M3 12h18"></path>
                <path d="M3 6h18"></path>
                <path d="M3 18h18"></path>
              </g>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white py-4 shadow-md">
          <ul className="flex flex-col space-y-4 px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-center hover:text-palmera-olive"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button 
                onClick={toggleLanguage}
                className="w-full py-2 mt-2 text-palmera-olive border border-palmera-olive rounded hover:bg-palmera-olive hover:text-white transition-colors duration-300"
              >
                {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
