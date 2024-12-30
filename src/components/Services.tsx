import React, { useEffect } from 'react';
import { Box, Calculator, Layers, Users } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

const services = [
  {
    icon: <Box className="w-12 h-12" />,
    title: 'Modelos 3D',
    description: 'Creación de modelos tridimensionales precisos para proyectos de construcción con tecnología BIM.',
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590986217679-f7858fb7af3a?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80'
    ]
  },
  {
    icon: <Calculator className="w-12 h-12" />,
    title: 'Cubicaciones',
    description: 'Cálculos detallados y precisos de materiales y recursos necesarios para tu proyecto.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80'
    ]
  },
  {
    icon: <Layers className="w-12 h-12" />,
    title: 'Presupuestos',
    description: 'Elaboración de presupuestos detallados para licitaciones y estimaciones de costos.',
    images: [
      'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554224154-d0e1c0b12e5e?auto=format&fit=crop&q=80'
    ]
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: 'Coordinación BIM',
    description: 'Integración y coordinación de especialidades para optimizar el diseño y la construcción.',
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
    ]
  }
];

export function Services() {
  useEffect(() => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('[data-carousel-slide]');
    const totalSlides = slides.length;

    const showSlide = (index: number) => {
      slides.forEach((slide, i) => {
        (slide as HTMLElement).style.opacity = i === index ? '1' : '0';
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    };

    // Set up click handlers
    const prevButton = document.querySelector('[data-carousel-prev]');
    const nextButton = document.querySelector('[data-carousel-next]');

    prevButton?.addEventListener('click', prevSlide);
    nextButton?.addEventListener('click', nextSlide);

    // Auto-advance carousel
    const interval = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(interval);
      prevButton?.removeEventListener('click', prevSlide);
      nextButton?.removeEventListener('click', nextSlide);
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        {/* Carrusel de imágenes de servicios */}
        <div className="relative overflow-hidden rounded-xl aspect-video shadow-lg">
          {services.map((service, serviceIndex) => (
            service.images.map((image, imageIndex) => (
              <div
                key={`${serviceIndex}-${imageIndex}`}
                className="absolute inset-0 transition-opacity duration-500"
                data-carousel-slide={serviceIndex * 3 + imageIndex}
                style={{ opacity: serviceIndex === 0 && imageIndex === 0 ? '1' : '0' }}
              >
                <img
                  src={image}
                  alt={`${service.title} - Imagen ${imageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
              </div>
            ))
          ))}
          
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              data-carousel-prev
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              data-carousel-next
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}