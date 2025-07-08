
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
      image: 'public/images/service1.jpg',
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
      price: 50,
      image: 'public/images/service2.jpg',
      category: 'pedicure complet',
      duration: '1h 15min'
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
      price: 45,
      image: 'public/images/service3.jpg',
      category: 'gel',
      duration: '1h45min'
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
      price: 60,
      image: 'public/images/service4.jpg',
      category: 'nailArt',
      duration: '2h15min'
    },
    {
      id: 'hand-spa',
      name: {
        en: 'Russian short nail manicure',
        es: 'Manicura rusa uña corta'
      },
      description: {
        en: 'It is a dry manicure. Cuticle cuticle perfect with scissors. Semi-permanent enamel with leveling. This allows the nails to keep in perfect condition for longer without breaking.',
        es: 'Es una manicura en seco. Corte de cutícula perfecto con tijeras. Esmaltado semi-permanente con nivelación. Esto permite que las uñas se mantengan en perfecto estado por más tiempo sin romperse.'
      },
      price: 45,
      image: 'public/images/service5.jpg',
      category: 'handSpa',
      duration: '1h45min'
    },
    {
      id: 'foot-spa',
      name: {
        en: 'Complete Unglazed Pedicure',
        es: 'Pedicura Completa Sin Esmaltar'
      },
      description: {
        en: 'Russian cleansing, durics + hydration and massage.',
        es: 'Limpieza Rusa, duricias + hidratacióny masaje.'
      },
      price: 55,
      image: 'public/images/service6.jpg',
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
