
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDatabase } from '../contexts/DatabaseContext';
import { toast } from '@/hooks/use-toast';

const Booking: React.FC = () => {
  const { t, language } = useLanguage();
  const { addClient, addVisit } = useDatabase();
  const [showBooksy, setShowBooksy] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation and sanitization
    const sanitizedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      date: formData.date,
      time: formData.time,
      notes: formData.notes.trim()
    };
    
    // Check for basic XSS patterns
    const hasXSS = Object.values(sanitizedData).some(val => 
      val && /<script|javascript:|onerror=|onload=|eval\(|setTimeout\(/i.test(val)
    );
    
    if (hasXSS) {
      toast({
        title: language === 'es' ? 'Error de validación' : 'Validation Error',
        description: language === 'es' 
          ? 'Los datos enviados contienen caracteres no permitidos.' 
          : 'Submitted data contains disallowed characters.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add client to database
      const newClient = addClient({
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
      });
      
      // Add visit/appointment to client
      const clientId = `client-${Date.now()}`;
      addVisit(clientId, {
        date: `${sanitizedData.date}T${sanitizedData.time}`,
        service: sanitizedData.service,
        price: 0, // Price will be set later
        notes: sanitizedData.notes || undefined,
      });
      
      // Show success message
      toast({
        title: language === 'es' ? '¡Reserva guardada!' : 'Booking saved!',
        description: language === 'es' 
          ? 'Tu cita ha sido guardada. Te contactaremos pronto para confirmar.' 
          : 'Your appointment has been saved. We\'ll contact you soon to confirm.',
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: ''
      });
      
    } catch (error) {
      toast({
        title: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Hubo un problema al guardar la reserva.' 
          : 'There was a problem saving the booking.',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="bg-gradient-to-br from-palmera-olive/5 to-palmera-olive/10 rounded-lg p-8 border border-palmera-olive/20">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-palmera-olive rounded-full mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-playfair font-bold mb-4 text-palmera-olive">¡Reserva tu Cita!</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Usa nuestra plataforma de reservas online <strong>Booksy</strong> para seleccionar tu cita de forma rápida, sencilla y segura.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Disponibilidad en tiempo real
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Confirmación inmediata
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Recordatorios automáticos
                    </div>
                  </div>
                  <a 
                    href="https://booksy.com/es-es/98089_tamar-rivera-nails_salon-de-unas_48863_barcelona?do=invite&_branch_match_id=1471238438340173835&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVz8ywKC0pKwoN802yrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUA1ZJaCzwAAAA%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-palmera-olive to-palmera-olive/80 text-white px-8 py-4 rounded-full hover:from-palmera-olive/90 hover:to-palmera-olive/70 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    🗓️ Reservar Ahora en Booksy
                  </a>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'es' ? 'Servicio' : 'Service'}
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
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
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
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
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
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
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                    rows={4}
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {language === 'es' 
                        ? 'He leído y acepto la ' 
                        : 'I have read and agree to the '}
                      <a href="/privacy-policy" className="text-palmera-olive hover:underline">
                        {language === 'es' ? 'política de privacidad' : 'privacy policy'}
                      </a>.
                    </span>
                  </label>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-palmera-olive text-white px-8 py-3 rounded hover:bg-opacity-90 transition-colors duration-300 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {language === 'es' ? 'Enviando...' : 'Sending...'}
                      </span>
                    ) : (
                      language === 'es' ? 'Reservar Cita' : 'Book Appointment'
                    )}
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