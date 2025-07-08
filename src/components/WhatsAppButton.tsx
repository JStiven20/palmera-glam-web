
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a delay to improve page load experience
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/+34631394572"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center bg-[#25D366] text-white rounded-full shadow-lg transition-all duration-500 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="p-4 rounded-full">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="white" 
          stroke="currentColor" 
          strokeWidth="0" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
          <path d="M11.999 1.998c-5.462 0-9.91 4.448-9.91 9.91 0 1.748.453 3.443 1.314 4.948L2 22.004l5.183-1.36a9.863 9.863 0 004.817 1.264c5.461 0 9.91-4.449 9.91-9.91.001-5.463-4.448-9.91-9.91-9.91zm0 18.166a8.25 8.25 0 01-4.195-1.14l-.3-.18-3.12.818.833-3.044-.196-.314a8.254 8.254 0 01-1.154-4.277c0-4.545 3.7-8.244 8.245-8.244 2.202 0 4.27.858 5.828 2.417a8.248 8.248 0 012.417 5.83c0 4.545-3.7 8.244-8.245 8.244z"></path>
        </svg>
      </div>
      <span className="pr-4 pl-1 py-2 text-sm font-medium">
        {t('whatsapp.message')}
      </span>
    </a>
  );
};

export default WhatsAppButton;
