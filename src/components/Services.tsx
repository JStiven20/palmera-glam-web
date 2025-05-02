
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceItem {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  price: number;
  image: string;
  category: string;
  duration: string;
}

const Services: React.FC = () => {
  const { t, language } = useLanguage();

  const services: ServiceItem[] = [
    {
      id: 'manicure-classic',
      name: {
        en: 'Classic Manicure',
        es: 'Manicura Clásica'
      },
      description: {
        en: 'Complete nail care with cuticle treatment, shaping, and polish.',
        es: 'Cuidado completo de uñas con tratamiento de cutículas, moldeado y esmalte.'
      },
      price: 25,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      category: 'manicure',
      duration: '30min'
    },
    {
      id: 'pedicure-classic',
      name: {
        en: 'Classic Pedicure',
        es: 'Pedicura Clásica'
      },
      description: {
        en: 'Relaxing foot treatment including soak, exfoliation, and polish.',
        es: 'Tratamiento relajante para pies que incluye remojo, exfoliación y esmalte.'
      },
      price: 35,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
      category: 'pedicure',
      duration: '40min'
    },
    {
      id: 'gel-polish',
      name: {
        en: 'Gel Polish',
        es: 'Esmalte de Gel'
      },
      description: {
        en: 'Long-lasting, chip-resistant gel polish application.',
        es: 'Aplicación de esmalte en gel de larga duración y resistente a desportillados.'
      },
      price: 30,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      category: 'gel',
      duration: '45min'
    },
    {
      id: 'nail-art',
      name: {
        en: 'Custom Nail Art',
        es: 'Nail Art Personalizado'
      },
      description: {
        en: 'Hand-painted designs customized to your preferences.',
        es: 'Diseños pintados a mano personalizados según tus preferencias.'
      },
      price: 15,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      category: 'nailArt',
      duration: '20min'
    },
    {
      id: 'hand-spa',
      name: {
        en: 'Luxury Hand Spa',
        es: 'Spa de Manos de Lujo'
      },
      description: {
        en: 'Rejuvenating hand treatment with massage and premium products.',
        es: 'Tratamiento rejuvenecedor para manos con masaje y productos premium.'
      },
      price: 45,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      category: 'handSpa',
      duration: '50min'
    },
    {
      id: 'foot-spa',
      name: {
        en: 'Luxury Foot Spa',
        es: 'Spa de Pies de Lujo'
      },
      description: {
        en: 'Complete foot rejuvenation with hot stones and aromatherapy.',
        es: 'Rejuvenecimiento completo de pies con piedras calientes y aromaterapia.'
      },
      price: 55,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
      category: 'footSpa',
      duration: '60min'
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair mb-4">{t('services.title')}</h2>
          <p className="text-xl text-gray-600">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="service-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name[language]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair mb-2">{service.name[language]}</h3>
                <p className="text-gray-600 mb-4">{service.description[language]}</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-palmera-olive">
                    {t('services.from')} €{service.price}
                  </span>
                  <span className="text-sm text-gray-500">{service.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="#booking"
            className="inline-block border-2 border-palmera-olive text-palmera-olive px-6 py-3 rounded hover:bg-palmera-olive hover:text-white transition-colors duration-300"
          >
            {t('hero.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
