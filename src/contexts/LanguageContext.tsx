
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Dictionary for translations
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': {
    en: 'Home',
    es: 'Inicio'
  },
  'nav.services': {
    en: 'Services',
    es: 'Servicios'
  },
  'nav.booking': {
    en: 'Book Now',
    es: 'Reservar'
  },
  'nav.gallery': {
    en: 'Gallery',
    es: 'Galería'
  },
  'nav.contact': {
    en: 'Contact',
    es: 'Contacto'
  },
  'nav.training': {
    en: 'Training',
    es: 'Formaciones'
  },
  // Hero section
  'hero.welcome': {
    en: 'Welcome to',
    es: 'Bienvenido a'
  },
  'hero.tagline': {
    en: 'Premium nail care in Barcelona',
    es: 'Cuidado premium de uñas en Barcelona'
  },
  'hero.cta': {
    en: 'Book Appointment',
    es: 'Reservar Cita'
  },
  // About section
  'about.title': {
    en: 'Our Studio',
    es: 'Nuestro Estudio'
  },
  'about.description': {
    en: 'Palmera Estudio is a premium manicure and pedicure center in Barcelona where luxury meets art. Our expert technicians use only the highest quality products to deliver exceptional nail care services in an elegant, relaxing environment.',
    es: 'Palmera Estudio es un centro premium de manicura y pedicura en Barcelona donde el lujo se encuentra con el arte. Nuestros técnicos expertos utilizan solo productos de la más alta calidad para ofrecer servicios excepcionales en un ambiente elegante y relajante.'
  },
  'about.mission': {
    en: 'Our mission is to transform nail care into a luxurious experience that enhances your natural beauty and boosts your confidence.',
    es: 'Nuestra misión es transformar el cuidado de uñas en una experiencia lujosa que realce tu belleza natural y aumente tu confianza.'
  },
  // Services section
  'services.title': {
    en: 'Our Services',
    es: 'Nuestros Servicios'
  },
  'services.subtitle': {
    en: 'Discover our premium treatments',
    es: 'Descubre nuestros tratamientos premium'
  },
  'services.manicure': {
    en: 'Manicure',
    es: 'Manicura'
  },
  'services.pedicure': {
    en: 'Pedicure',
    es: 'Pedicura'
  },
  'services.gel': {
    en: 'Gel Polish',
    es: 'Esmalte de Gel'
  },
  'services.nailArt': {
    en: 'Nail Art',
    es: 'Nail Art'
  },
  'services.handSpa': {
    en: 'Hand Spa',
    es: 'Spa de Manos'
  },
  'services.footSpa': {
    en: 'Foot Spa',
    es: 'Spa de Pies'
  },
  'services.classic': {
    en: 'Classic',
    es: 'Clásico'
  },
  'services.premium': {
    en: 'Premium',
    es: 'Premium'
  },
  'services.luxury': {
    en: 'Luxury',
    es: 'Lujo'
  },
  'services.from': {
    en: 'from',
    es: 'desde'
  },
  'services.viewDetails': {
    en: 'View Details',
    es: 'Ver Detalles'
  },
  // Booking section
  'booking.title': {
    en: 'Book Your Appointment',
    es: 'Reserva Tu Cita'
  },
  'booking.subtitle': {
    en: 'Choose your preferred date and time',
    es: 'Elige tu fecha y hora preferidas'
  },
  'booking.booksy': {
    en: 'Book via Booksy',
    es: 'Reservar vía Booksy'
  },
  'booking.or': {
    en: 'or',
    es: 'o'
  },
  'booking.direct': {
    en: 'Book directly with us',
    es: 'Reserva directamente con nosotros'
  },
  // Gallery section
  'gallery.title': {
    en: 'Our Gallery',
    es: 'Nuestra Galería'
  },
  'gallery.subtitle': {
    en: 'Explore our latest work',
    es: 'Explora nuestro trabajo más reciente'
  },
  // Contact section
  'contact.title': {
    en: 'Contact Us',
    es: 'Contáctanos'
  },
  'contact.subtitle': {
    en: 'We\'d love to hear from you',
    es: 'Nos encantaría saber de ti'
  },
  'contact.name': {
    en: 'Name',
    es: 'Nombre'
  },
  'contact.email': {
    en: 'Email',
    es: 'Correo'
  },
  'contact.phone': {
    en: 'Phone',
    es: 'Teléfono'
  },
  'contact.message': {
    en: 'Message',
    es: 'Mensaje'
  },
  'contact.send': {
    en: 'Send Message',
    es: 'Enviar Mensaje'
  },
  'contact.address': {
    en: 'Our Address',
    es: 'Nuestra Dirección'
  },
  'contact.hours': {
    en: 'Business Hours',
    es: 'Horario'
  },
  'contact.monday': {
    en: 'Monday',
    es: 'Lunes'
  },
  'contact.tuesday': {
    en: 'Tuesday',
    es: 'Martes'
  },
  'contact.wednesday': {
    en: 'Wednesday',
    es: 'Miércoles'
  },
  'contact.thursday': {
    en: 'Thursday',
    es: 'Jueves'
  },
  'contact.friday': {
    en: 'Friday',
    es: 'Viernes'
  },
  'contact.saturday': {
    en: 'Saturday',
    es: 'Sábado'
  },
  'contact.sunday': {
    en: 'Sunday',
    es: 'Domingo'
  },
  'contact.closed': {
    en: 'Closed',
    es: 'Cerrado'
  },
  // Footer
  'footer.rights': {
    en: 'All rights reserved',
    es: 'Todos los derechos reservados'
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    es: 'Política de Privacidad'
  },
  'footer.terms': {
    en: 'Terms of Service',
    es: 'Términos de Servicio'
  },
  'footer.follow': {
    en: 'Follow Us',
    es: 'Síguenos'
  },
  'footer.subscribe': {
    en: 'Subscribe to our newsletter',
    es: 'Suscríbete a nuestro boletín'
  },
  'footer.subscribeButton': {
    en: 'Subscribe',
    es: 'Suscribirse'
  },
  // WhatsApp
  'whatsapp.message': {
    en: 'Chat with us',
    es: 'Chatea con nosotros'
  },
  // Training page
  'training.title': {
    en: 'Professional Training',
    es: 'Formaciones Profesionales'
  },
  'training.subtitle': {
    en: 'Become a nail art expert with our professional courses',
    es: 'Conviértete en experto en nail art con nuestros cursos profesionales'
  },
  'training.duration': {
    en: 'Duration',
    es: 'Duración'
  },
  'training.level': {
    en: 'Level',
    es: 'Nivel'
  },
  'training.price': {
    en: 'Price',
    es: 'Precio'
  },
  'training.includes': {
    en: 'Includes',
    es: 'Incluye'
  },
  'training.beginner': {
    en: 'Beginner',
    es: 'Principiante'
  },
  'training.intermediate': {
    en: 'Intermediate',
    es: 'Intermedio'
  },
  'training.advanced': {
    en: 'Advanced',
    es: 'Avanzado'
  },
  'training.hours': {
    en: 'hours',
    es: 'horas'
  },
  'training.certificate': {
    en: 'Certificate included',
    es: 'Certificado incluido'
  },
  'training.materials': {
    en: 'Materials included',
    es: 'Materiales incluidos'
  },
  'training.practice': {
    en: 'Practical sessions',
    es: 'Sesiones prácticas'
  },
  'training.enroll': {
    en: 'Enroll Now',
    es: 'Inscribirse Ahora'
  },
  'training.contact': {
    en: 'Contact for Details',
    es: 'Contactar para Detalles'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Spanish since the business is in Barcelona
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
