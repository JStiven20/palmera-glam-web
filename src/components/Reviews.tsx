import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Star, ExternalLink } from 'lucide-react';

const Reviews: React.FC = () => {
  const { t, language } = useLanguage();

  const googleMapsUrl = "https://g.page/r/YOUR_GOOGLE_MAPS_PLACE_ID/review";

  return (
    <section id="reviews" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">
            {language === 'es' ? 'Reseñas de nuestros clientes' : 'Customer Reviews'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {language === 'es' 
              ? 'Descubre lo que opinan nuestros clientes sobre nuestros servicios'
              : 'See what our customers say about our services'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="animate-on-scroll">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center items-center mb-6">
                <div className="flex text-yellow-400 text-2xl">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-current" />
                  ))}
                </div>
                <span className="ml-4 text-2xl font-semibold">5.0</span>
              </div>
              
              <h3 className="text-xl font-medium mb-4">
                {language === 'es' 
                  ? 'Excelente servicio con más de 50 reseñas positivas'
                  : 'Excellent service with over 50 positive reviews'
                }
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {language === 'es'
                  ? 'Nuestros clientes valoran la calidad de nuestros servicios de manicura y pedicura. Lee todas las reseñas en Google Maps.'
                  : 'Our clients value the quality of our manicure and pedicure services. Read all reviews on Google Maps.'
                }
              </p>
              
              <Button 
                asChild
                className="inline-flex items-center gap-2"
              >
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  {language === 'es' ? 'Ver reseñas en Google' : 'View Google Reviews'}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Reviews;