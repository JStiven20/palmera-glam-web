import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Clock, Users, Award, BookOpen, Star, CheckCircle } from 'lucide-react';

interface TrainingCourse {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  duration: number; // hours
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  image: string;
  includes: { en: string[]; es: string[] };
  featured: boolean;
}

const courses: TrainingCourse[] = [
  {
    id: 'basic-manicure',
    title: {
      en: 'Basic Manicure & Pedicure',
      es: 'Manicura y Pedicura Básica'
    },
    description: {
      en: 'Learn the fundamentals of professional nail care, from preparation to finishing touches.',
      es: 'Aprende los fundamentos del cuidado profesional de uñas, desde la preparación hasta los toques finales.'
    },
    duration: 16,
    level: 'beginner',
    price: 299,
    image: '/images/service1.jpg',
    includes: {
      en: ['Professional tools kit', 'Practice materials', 'Certificate', 'Handbook'],
      es: ['Kit de herramientas profesionales', 'Materiales de práctica', 'Certificado', 'Manual']
    },
    featured: true
  },
  {
    id: 'gel-polish',
    title: {
      en: 'Gel Polish Specialist',
      es: 'Especialista en Esmalte de Gel'
    },
    description: {
      en: 'Master the art of gel polish application, removal, and advanced techniques.',
      es: 'Domina el arte de la aplicación de esmalte de gel, remoción y técnicas avanzadas.'
    },
    duration: 12,
    level: 'intermediate',
    price: 399,
    image: '/images/service2.jpg',
    includes: {
      en: ['Gel polish kit', 'UV/LED lamp', 'Certificate', 'Business guidance'],
      es: ['Kit de esmalte de gel', 'Lámpara UV/LED', 'Certificado', 'Guía de negocio']
    },
    featured: false
  },
  {
    id: 'nail-art',
    title: {
      en: 'Professional Nail Art',
      es: 'Nail Art Profesional'
    },
    description: {
      en: 'Create stunning nail art designs with professional techniques and artistic skills.',
      es: 'Crea diseños de nail art impresionantes con técnicas profesionales y habilidades artísticas.'
    },
    duration: 24,
    level: 'intermediate',
    price: 549,
    image: '/images/service3.jpg',
    includes: {
      en: ['Art supplies', 'Design templates', 'Portfolio development', 'Certificate'],
      es: ['Suministros de arte', 'Plantillas de diseño', 'Desarrollo de portafolio', 'Certificado']
    },
    featured: true
  },
  {
    id: 'advanced-techniques',
    title: {
      en: 'Advanced Nail Techniques',
      es: 'Técnicas Avanzadas de Uñas'
    },
    description: {
      en: 'Master advanced techniques including extensions, sculptures, and complex designs.',
      es: 'Domina técnicas avanzadas incluyendo extensiones, esculturas y diseños complejos.'
    },
    duration: 32,
    level: 'advanced',
    price: 749,
    image: '/images/service4.jpg',
    includes: {
      en: ['Professional acrylic kit', 'Extension tools', 'Advanced certificate', 'Master class access'],
      es: ['Kit profesional de acrílico', 'Herramientas de extensión', 'Certificado avanzado', 'Acceso a master class']
    },
    featured: false
  },
  {
    id: 'business-course',
    title: {
      en: 'Nail Business Startup',
      es: 'Inicio de Negocio de Uñas'
    },
    description: {
      en: 'Complete course on starting and managing your own nail salon business.',
      es: 'Curso completo sobre cómo iniciar y gestionar tu propio negocio de salón de uñas.'
    },
    duration: 20,
    level: 'intermediate',
    price: 449,
    image: '/images/service5.jpg',
    includes: {
      en: ['Business plan template', 'Marketing materials', 'Legal guidance', 'Mentorship'],
      es: ['Plantilla de plan de negocio', 'Materiales de marketing', 'Guía legal', 'Mentoría']
    },
    featured: false
  },
  {
    id: 'complete-program',
    title: {
      en: 'Complete Professional Program',
      es: 'Programa Profesional Completo'
    },
    description: {
      en: 'Comprehensive program covering all aspects of professional nail care and business.',
      es: 'Programa integral que cubre todos los aspectos del cuidado profesional de uñas y negocio.'
    },
    duration: 80,
    level: 'beginner',
    price: 1299,
    image: '/images/service6.jpg',
    includes: {
      en: ['All course materials', 'Professional kit', 'Internship opportunity', 'Job placement assistance'],
      es: ['Todos los materiales del curso', 'Kit profesional', 'Oportunidad de prácticas', 'Asistencia para conseguir trabajo']
    },
    featured: true
  }
];

const Training: React.FC = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleEnrollment = (courseId: string) => {
    // This would integrate with the booking system or contact form
    const whatsappNumber = "+34123456789"; // Replace with actual number
    const message = `Hola! Me interesa el curso: ${courses.find(c => c.id === courseId)?.title[language]}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>{t('training.title')} | Palmera Estudio</title>
        <meta 
          name="description" 
          content={language === 'es' 
            ? "Formaciones profesionales en manicura, pedicura y nail art en Barcelona. Cursos certificados con materiales incluidos." 
            : "Professional training in manicure, pedicure and nail art in Barcelona. Certified courses with materials included."
          } 
        />
        <meta name="keywords" content={language === 'es' 
          ? "formaciones manicura, cursos nail art, escuela uñas Barcelona, certificación manicura" 
          : "manicure training, nail art courses, nail school Barcelona, manicure certification"
        } />
        <link rel="canonical" href="https://palmera-estudio.com/training" />
        <meta property="og:title" content={`${t('training.title')} | Palmera Estudio`} />
        <meta property="og:description" content={t('training.subtitle')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://palmera-estudio.com/training" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Palmera Estudio Training",
            "description": t('training.subtitle'),
            "url": "https://palmera-estudio.com/training",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Carrer de Barcelona, 123",
              "addressLocality": "Barcelona",
              "addressCountry": "ES"
            },
            "courses": courses.map(course => ({
              "@type": "Course",
              "name": course.title[language],
              "description": course.description[language],
              "provider": "Palmera Estudio",
              "educationalLevel": course.level,
              "timeRequired": `PT${course.duration}H`,
              "offers": {
                "@type": "Offer",
                "price": course.price,
                "priceCurrency": "EUR"
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('training.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('training.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-primary" />
                  <span>{t('training.certificate')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>{t('training.materials')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{t('training.practice')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card 
                  key={course.id} 
                  className={`group hover:shadow-xl transition-all duration-300 ${
                    course.featured ? 'ring-2 ring-primary/20 bg-gradient-to-br from-background to-primary/5' : ''
                  }`}
                >
                  {course.featured && (
                    <div className="absolute -top-3 left-4 z-10">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={course.image} 
                      alt={course.title[language]}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={getLevelBadgeColor(course.level)}>
                        {t(`training.${course.level}`)}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-playfair">
                      {course.title[language]}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {course.description[language]}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration} {t('training.hours')}</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        €{course.price}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{t('training.includes')}:</h4>
                      <ul className="space-y-1">
                        {course.includes[language].slice(0, 3).map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {course.includes[language].length > 3 && (
                          <li className="text-sm text-muted-foreground">
                            +{course.includes[language].length - 3} más...
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={() => handleEnrollment(course.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {t('training.enroll')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              {t('training.contact')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'es' 
                ? "¿Tienes preguntas sobre nuestros cursos? Contáctanos para obtener más información y encontrar el programa perfecto para ti."
                : "Have questions about our courses? Contact us for more information and find the perfect program for you."
              }
            </p>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t('contact.title')}
            </Button>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Training;