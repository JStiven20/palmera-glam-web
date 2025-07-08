
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-palmera-beige bg-opacity-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl md:text-4xl font-playfair mb-6">{t('about.title')}</h2>
            <p className="text-lg mb-6 leading-relaxed">
              {t('about.description')}
            </p>
            <p className="text-palmera-olive italic font-medium">
              {t('about.mission')}
            </p>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                <img 
                  src="/images/about1.jpg" 
                  alt="Palmera Estudio Interior" 
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                <img 
                  src="/images/about2.jpg" 
                  alt="Nail Art Detail" 
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
