
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import { loadRecaptcha } from '@/utils/recaptcha';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Load reCAPTCHA when component mounts
    loadRecaptcha().catch(error => {
      console.error('Failed to load reCAPTCHA:', error);
    });
  }, []);

  return (
    <section id="contact" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">{t('contact.title')}</h2>
          <p className="text-gray-600 mb-8">{t('contact.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="animate-on-scroll">
            <ContactForm />
          </div>
          
          {/* Contact Information */}
          <div className="animate-on-scroll">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
