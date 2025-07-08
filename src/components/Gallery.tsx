import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  // Gallery images - updated to WebP format with proper sizing
  const images = [
    {
      src: 'public/images/service1.jpg',
      alt: 'Nail design example 1',
      width: 800,
      height: 600,
    },
    {
      src: 'public/images/service2.jpg',
      alt: 'Nail design example 2',
      width: 800,
      height: 600,
    },
    {
      src: 'public/images/service3.jpg',
      alt: 'Nail design example 3',
      width: 800,
      height: 600,
    },
    {
      src: 'public/images/service4.jpg',
      alt: 'Nail design example 4',
      width: 800,
      height: 600,
    },
    {
      src: 'public/images/service5.jpg',
      alt: 'Nail design example 5',
      width: 800,
      height: 600,
    },
    {
      src: 'public/images/service6.jpg',
      alt: 'Nail design example 6',
      width: 800,
      height: 600,
    }
  ];

  const nextSlide = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair mb-4">{t('gallery.title')}</h2>
          <p className="text-xl text-gray-600">{t('gallery.subtitle')}</p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out h-[500px] md:h-[600px]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="min-w-full h-full"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full p-3 focus:outline-none transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full p-3 focus:outline-none transition-all duration-300"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full mx-1 focus:outline-none transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-palmera-olive' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Grid - updated with width and height attributes */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`overflow-hidden rounded-md focus:outline-none transition-all duration-300 ${
                  activeIndex === index ? 'ring-2 ring-palmera-olive' : ''
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={150}
                  loading="lazy"
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
