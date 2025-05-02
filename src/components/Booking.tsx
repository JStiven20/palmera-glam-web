
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Booking: React.FC = () => {
  const { t, language } = useLanguage();
  const [showBooksy, setShowBooksy] = useState(true);

  return (
    <section id="booking" className="py-20 bg-palmera-beige bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair mb-4">{t('booking.title')}</h2>
          <p className="text-xl text-gray-600">{t('booking.subtitle')}</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center space-x-6 mb-8">
            <button
              className={`px-6 py-3 rounded transition-colors ${
                showBooksy 
                  ? 'bg-palmera-olive text-white' 
                  : 'border border-palmera-olive text-palmera-olive'
              }`}
              onClick={() => setShowBooksy(true)}
            >
              {t('booking.booksy')}
            </button>
            <span className="flex items-center text-gray-500">{t('booking.or')}</span>
            <button
              className={`px-6 py-3 rounded transition-colors ${
                !showBooksy 
                  ? 'bg-palmera-olive text-white' 
                  : 'border border-palmera-olive text-palmera-olive'
              }`}
              onClick={() => setShowBooksy(false)}
            >
              {t('booking.direct')}
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            {showBooksy ? (
              <div className="aspect-w-16 aspect-h-9">
                {/* Placeholder for Booksy iframe */}
                <div className="booking-iframe flex items-center justify-center bg-gray-100 p-10 text-center">
                  <div>
                    <p className="text-lg mb-4">Booksy integration placeholder</p>
                    <p className="text-gray-500 mb-6">This would be replaced with the actual Booksy booking widget iframe</p>
                    <a 
                      href="https://booksy.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-palmera-olive text-white px-6 py-2 rounded"
                    >
                      {t('booking.booksy')}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.name')}</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.email')}</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'es' ? 'Servicio' : 'Service'}
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                    >
                      <option value="">{language === 'es' ? 'Seleccionar servicio' : 'Select service'}</option>
                      <option value="manicure">{t('services.manicure')}</option>
                      <option value="pedicure">{t('services.pedicure')}</option>
                      <option value="gel">{t('services.gel')}</option>
                      <option value="nailArt">{t('services.nailArt')}</option>
                      <option value="handSpa">{t('services.handSpa')}</option>
                      <option value="footSpa">{t('services.footSpa')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'es' ? 'Fecha' : 'Date'}
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'es' ? 'Hora' : 'Time'}
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'es' ? 'Notas adicionales' : 'Additional notes'}
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                    rows={4}
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-palmera-olive text-white px-8 py-3 rounded hover:bg-opacity-90 transition-colors duration-300"
                  >
                    {language === 'es' ? 'Reservar Cita' : 'Book Appointment'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
