
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

const ContactInfo = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-3">{t('contact.address')}</h3>
          <p className="text-gray-600">Carrer de València 123</p>
          <p className="text-gray-600">08011 Barcelona, Spain</p>
          <p className="text-gray-600 mt-4">
            <span className="font-medium">Email:</span> info@palmeraestudio.com
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Tel:</span> +34 93 123 4567
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-3">{t('contact.hours')}</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('contact.monday')}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t('contact.tuesday')}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t('contact.wednesday')}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t('contact.thursday')}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t('contact.friday')}:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t('contact.saturday')}:</span>
              <span>10:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span>{t('contact.sunday')}:</span>
              <span>{t('contact.closed')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.6854665629924!2d2.1577967!3d41.3850639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f34ae2223f%3A0x6e7f20058121aa0d!2sCarrer%20de%20Val%C3%A8ncia%2C%20Barcelona%2C%20Spain!5e0!3m2!1sen!2sus!4v1659234567890!5m2!1sen!2sus"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: '0.5rem' }}
          allowFullScreen
          loading="lazy"
          title={language === 'es' ? 'Mapa de ubicación de Palmera Estudio' : 'Map location of Palmera Estudio'}
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;
