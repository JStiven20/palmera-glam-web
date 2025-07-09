import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { Clock, MapPin, Phone, Mail, Calendar, Star } from 'lucide-react';

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
  longDescription: {
    en: string;
    es: string;
  };
  price: number;
  image: string;
  category: string;
  duration: string;
  benefits: {
    en: string[];
    es: string[];
  };
  includes: {
    en: string[];
    es: string[];
  };
}

const ServicesContent: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
      longDescription: {
        en: 'Our classic manicure is the perfect foundation for healthy, beautiful nails. This comprehensive treatment includes nail shaping, cuticle care, and your choice of polish finish.',
        es: 'Nuestra manicura clásica es la base perfecta para uñas saludables y hermosas. Este tratamiento integral incluye moldeado de uñas, cuidado de cutículas y tu elección de acabado de esmalte.'
      },
      price: 25,
      image: '/images/service1.jpg',
      category: 'manicure',
      duration: '30min',
      benefits: {
        en: ['Healthier nails', 'Professional finish', 'Relaxing experience'],
        es: ['Uñas más saludables', 'Acabado profesional', 'Experiencia relajante']
      },
      includes: {
        en: ['Nail shaping', 'Cuticle treatment', 'Base coat', 'Polish application', 'Top coat'],
        es: ['Moldeado de uñas', 'Tratamiento de cutículas', 'Base', 'Aplicación de esmalte', 'Capa superior']
      }
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
      longDescription: {
        en: 'Indulge in our luxurious classic pedicure that will leave your feet feeling refreshed and looking beautiful. This complete treatment focuses on foot health and relaxation.',
        es: 'Disfruta de nuestra lujosa pedicura clásica que dejará tus pies sintiéndose renovados y luciendo hermosos. Este tratamiento completo se enfoca en la salud del pie y la relajación.'
      },
      price: 50,
      image: '/images/service2.jpg',
      category: 'pedicure',
      duration: '1h 15min',
      benefits: {
        en: ['Improved circulation', 'Soft, smooth skin', 'Stress relief'],
        es: ['Circulación mejorada', 'Piel suave y tersa', 'Alivio del estrés']
      },
      includes: {
        en: ['Foot soak', 'Exfoliation', 'Nail trimming', 'Cuticle care', 'Moisturizing', 'Polish'],
        es: ['Remojo de pies', 'Exfoliación', 'Corte de uñas', 'Cuidado de cutículas', 'Hidratación', 'Esmalte']
      }
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
      longDescription: {
        en: 'Experience the durability and shine of our gel polish service. Perfect for those who want long-lasting color that maintains its brilliance for weeks.',
        es: 'Experimenta la durabilidad y brillo de nuestro servicio de esmalte en gel. Perfecto para quienes quieren color duradero que mantiene su brillantez por semanas.'
      },
      price: 45,
      image: '/images/service3.jpg',
      category: 'gel',
      duration: '1h45min',
      benefits: {
        en: ['Long-lasting color', 'Chip-resistant', 'High shine finish'],
        es: ['Color duradero', 'Resistente a astillas', 'Acabado con alto brillo']
      },
      includes: {
        en: ['Nail prep', 'Base gel', 'Color application', 'Top coat', 'UV curing'],
        es: ['Preparación de uñas', 'Gel base', 'Aplicación de color', 'Capa superior', 'Curado UV']
      }
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
      longDescription: {
        en: 'Express your unique style with our custom nail art service. Our skilled artists create personalized designs that reflect your personality and preferences.',
        es: 'Expresa tu estilo único con nuestro servicio de nail art personalizado. Nuestros artistas especializados crean diseños personalizados que reflejan tu personalidad y preferencias.'
      },
      price: 60,
      image: '/images/service4.jpg',
      category: 'nailArt',
      duration: '2h15min',
      benefits: {
        en: ['Unique designs', 'Artistic expression', 'Professional artistry'],
        es: ['Diseños únicos', 'Expresión artística', 'Arte profesional']
      },
      includes: {
        en: ['Design consultation', 'Custom artwork', 'Premium materials', 'Protective finish'],
        es: ['Consulta de diseño', 'Arte personalizado', 'Materiales premium', 'Acabado protector']
      }
    },
    {
      id: 'hand-spa',
      name: {
        en: 'Russian Short Nail Manicure',
        es: 'Manicura Rusa Uña Corta'
      },
      description: {
        en: 'It is a dry manicure. Cuticle cuticle perfect with scissors. Semi-permanent enamel with leveling.',
        es: 'Es una manicura en seco. Corte de cutícula perfecto con tijeras. Esmaltado semi-permanente con nivelación.'
      },
      longDescription: {
        en: 'The Russian technique is a precise, dry manicure method that creates perfectly clean cuticles and long-lasting results. This technique ensures your nails maintain their perfect condition for longer.',
        es: 'La técnica rusa es un método de manicura seca y precisa que crea cutículas perfectamente limpias y resultados duraderos. Esta técnica asegura que tus uñas mantengan su condición perfecta por más tiempo.'
      },
      price: 45,
      image: '/images/service5.jpg',
      category: 'handSpa',
      duration: '1h45min',
      benefits: {
        en: ['Precise technique', 'Longer-lasting results', 'Professional finish'],
        es: ['Técnica precisa', 'Resultados más duraderos', 'Acabado profesional']
      },
      includes: {
        en: ['Dry manicure', 'Precision cuticle work', 'Leveling base', 'Semi-permanent polish'],
        es: ['Manicura seca', 'Trabajo preciso de cutículas', 'Base niveladora', 'Esmalte semi-permanente']
      }
    },
    {
      id: 'foot-spa',
      name: {
        en: 'Complete Unglazed Pedicure',
        es: 'Pedicura Completa Sin Esmaltar'
      },
      description: {
        en: 'Russian cleansing, durics + hydration and massage.',
        es: 'Limpieza Rusa, duricias + hidratación y masaje.'
      },
      longDescription: {
        en: 'A comprehensive foot treatment focusing on health and comfort. This service includes Russian cleaning technique, callus removal, deep hydration, and relaxing massage.',
        es: 'Un tratamiento integral de pies enfocado en la salud y comodidad. Este servicio incluye técnica de limpieza rusa, eliminación de callos, hidratación profunda y masaje relajante.'
      },
      price: 55,
      image: '/images/service6.jpg',
      category: 'footSpa',
      duration: '60min',
      benefits: {
        en: ['Deep cleansing', 'Callus removal', 'Intensive hydration', 'Relaxation'],
        es: ['Limpieza profunda', 'Eliminación de callos', 'Hidratación intensiva', 'Relajación']
      },
      includes: {
        en: ['Russian technique', 'Callus treatment', 'Deep moisturizing', 'Therapeutic massage'],
        es: ['Técnica rusa', 'Tratamiento de callos', 'Hidratación profunda', 'Masaje terapéutico']
      }
    }
  ];

  const categories = [
    { key: 'all', label: { en: 'All Services', es: 'Todos los Servicios' } },
    { key: 'manicure', label: { en: 'Manicures', es: 'Manicuras' } },
    { key: 'pedicure', label: { en: 'Pedicures', es: 'Pedicuras' } },
    { key: 'gel', label: { en: 'Gel Polish', es: 'Esmalte Gel' } },
    { key: 'nailArt', label: { en: 'Nail Art', es: 'Nail Art' } },
    { key: 'handSpa', label: { en: 'Hand Spa', es: 'Spa de Manos' } },
    { key: 'footSpa', label: { en: 'Foot Spa', es: 'Spa de Pies' } }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-playfair font-bold text-primary">Palmera Studio</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#services" className="text-foreground hover:text-primary transition-colors">
                  {language === 'es' ? 'Servicios' : 'Services'}
                </a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                  {language === 'es' ? 'Contacto' : 'Contact'}
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="px-3 py-1 rounded border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {language === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-secondary/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-foreground">
            {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Descubre nuestra amplia gama de servicios profesionales de belleza diseñados para realzar tu belleza natural.'
              : 'Discover our comprehensive range of professional beauty services designed to enhance your natural beauty.'
            }
          </p>
          <div className="flex justify-center items-center space-x-6 text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">5.0</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-1" />
              <span>Barcelona, Spain</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {category.label[language]}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={service.image} 
                      alt={service.name[language]}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-playfair font-bold text-foreground">{service.name[language]}</h3>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary">€{service.price}</span>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{service.longDescription[language]}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {language === 'es' ? 'Beneficios:' : 'Benefits:'}
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {service.benefits[language].map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {language === 'es' ? 'Incluye:' : 'Includes:'}
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {service.includes[language].map((item, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-foreground">
              {language === 'es' ? 'Reserva tu Cita' : 'Book Your Appointment'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {language === 'es' 
                ? 'Estamos aquí para ayudarte a lucir y sentirte increíble'
                : 'We\'re here to help you look and feel amazing'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-playfair font-bold mb-6 text-foreground">
                {language === 'es' ? 'Información de Contacto' : 'Contact Information'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-foreground">+34 123 456 789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-foreground">info@palmerastudio.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-foreground">Barcelona, España</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-foreground">
                    {language === 'es' ? 'Lun - Sáb: 9:00 - 20:00' : 'Mon - Sat: 9:00 - 20:00'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-playfair font-bold mb-6 text-foreground">
                {language === 'es' ? 'Horario de Atención' : 'Business Hours'}
              </h3>
              <div className="space-y-3 text-foreground">
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Lunes - Viernes' : 'Monday - Friday'}</span>
                  <span>9:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Sábado' : 'Saturday'}</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Domingo' : 'Sunday'}</span>
                  <span>{language === 'es' ? 'Cerrado' : 'Closed'}</span>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="tel:+34123456789"
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {language === 'es' ? 'Reservar Cita' : 'Book Appointment'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-playfair font-bold mb-4">Palmera Studio</h3>
            <p className="text-background/80 mb-4">
              {language === 'es' 
                ? 'Tu belleza en las mejores manos'
                : 'Your beauty in the best hands'
              }
            </p>
            <div className="flex justify-center space-x-6 text-sm text-background/60">
              <span>© 2024 Palmera Studio</span>
              <span>|</span>
              <span>{language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  return (
    <LanguageProvider>
      <ServicesContent />
    </LanguageProvider>
  );
};

export default ServicesPage;