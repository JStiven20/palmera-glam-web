
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const { language } = useLanguage();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Wait a bit before showing the banner
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
    
    // Initialize Meta Pixel after accepting cookies
    if (typeof window !== 'undefined') {
      // This will trigger the Meta Pixel initialization in App.tsx
      window.location.reload();
    }
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-4 md:p-6 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="pr-6 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">
              {language === 'es' ? 'Política de cookies' : 'Cookie Policy'}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              {language === 'es' 
                ? 'Este sitio utiliza cookies para mejorar su experiencia. Al hacer clic en "Aceptar", acepta nuestro uso de cookies para análisis, personalización y publicidad.' 
                : 'This site uses cookies to improve your experience. By clicking "Accept", you agree to our use of cookies for analytics, personalization, and ads.'}
              {' '}
              <a 
                href="/cookie-policy" 
                className="text-palmera-olive hover:underline"
              >
                {language === 'es' ? 'Más información' : 'Learn more'}
              </a>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={declineCookies}
              className="text-gray-500 hover:text-gray-700 text-sm px-4 py-2"
            >
              {language === 'es' ? 'Rechazar' : 'Decline'}
            </button>
            <button 
              onClick={acceptCookies}
              className="bg-palmera-olive text-white px-4 py-2 rounded hover:bg-opacity-90 text-sm md:text-base"
            >
              {language === 'es' ? 'Aceptar' : 'Accept'}
            </button>
            <button 
              onClick={() => setShowConsent(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
