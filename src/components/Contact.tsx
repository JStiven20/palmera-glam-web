
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDatabase } from '../contexts/DatabaseContext';
import { toast } from '@/hooks/use-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { addClient } = useDatabase();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValue) {
      toast({
        title: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Por favor, verifica que no eres un robot.' 
          : 'Please verify that you are not a robot.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Basic validation and sanitization
    const sanitizedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim()
    };
    
    // Check for basic XSS patterns
    const hasXSS = Object.values(sanitizedData).some(val => 
      /<script|javascript:|onerror=|onload=|eval\(|setTimeout\(/i.test(val)
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
      setIsSubmitting(false);
      return;
    }
    
    // Simulate form submission with security validation
    setTimeout(() => {
      // Add client to database
      addClient({
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone
      });
      
      // Show success message
      toast({
        title: language === 'es' ? '¡Mensaje enviado!' : 'Message sent!',
        description: language === 'es' 
          ? 'Nos pondremos en contacto pronto.' 
          : 'We\'ll get back to you soon.',
        duration: 5000,
      });
      
      // Reset form and captcha
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setCaptchaValue(null);
      
      // @ts-ignore - Reset the reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  const businessHours = [
    { day: t('contact.monday'), hours: '10:00 - 19:00' },
    { day: t('contact.tuesday'), hours: '10:00 - 19:00' },
    { day: t('contact.wednesday'), hours: '10:00 - 19:00' },
    { day: t('contact.thursday'), hours: '10:00 - 20:00' },
    { day: t('contact.friday'), hours: '10:00 - 20:00' },
    { day: t('contact.saturday'), hours: '10:00 - 18:00' },
    { day: t('contact.sunday'), hours: t('contact.closed') }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair mb-4">{t('contact.title')}</h2>
          <p className="text-xl text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                  {t('contact.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-palmera-olive"
                  required
                ></textarea>
              </div>
              
              <div className="mb-6">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is Google's test key for development
                  onChange={handleCaptchaChange}
                />
                <p className="text-xs text-gray-500 mt-2">
                  {language === 'es' 
                    ? 'Este sitio está protegido por reCAPTCHA y se aplican la Política de Privacidad y los Términos de Servicio de Google.' 
                    : 'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.'}
                </p>
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
                    </a>
                    {language === 'es' ? ' y ' : ' and '}
                    <a href="/cookie-policy" className="text-palmera-olive hover:underline">
                      {language === 'es' ? 'política de cookies' : 'cookie policy'}
                    </a>.
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !captchaValue}
                className={`w-full bg-palmera-olive text-white py-3 px-4 rounded hover:bg-opacity-90 transition-colors ${
                  isSubmitting || !captchaValue ? 'opacity-70 cursor-not-allowed' : ''
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
                ) : t('contact.send')}
              </button>
            </form>
          </div>
          
          {/* Contact Info & Map */}
          <div>
            <div className="mb-8">
              <h3 className="font-playfair text-xl mb-4">{t('contact.address')}</h3>
              <p className="mb-4">Carrer d'Example, 123<br />08001 Barcelona</p>
              
              {/* Google Map */}
              <div className="h-60 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  title="Palmera Estudio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.414289111547!2d2.1658107768624744!3d41.38661549990776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f34cbed891%3A0x405a99fe312a0a0!2sBarcelona%2C%20Spain!5e0!3m2!1sen!2sau!4v1714392415867!5m2!1sen!2sau" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-playfair text-xl mb-4">{t('contact.hours')}</h3>
              <ul className="space-y-2">
                {businessHours.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="font-medium">{item.day}</span>
                    <span>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <a
                href="https://wa.me/+34123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-[#25D366] text-white py-3 px-4 rounded hover:bg-opacity-90 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm0 0a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
                </svg>
                {t('whatsapp.message')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
