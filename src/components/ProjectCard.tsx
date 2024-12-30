import React, { useState, useEffect } from 'react';
import type { Project } from '../types/projects';

export default function ProjectCard(props: Project) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDefaultModel = props.a360Link === 'default';

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % props.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + props.images.length) % props.images.length);
  };

  useEffect(() => {
    if (props.images.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [props.images.length]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group h-[600px] relative [perspective:1000px]">
      <div 
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
          <div className="relative h-full">
            {/* Carousel - 70% height */}
            <div className="relative h-[70%]">
              {props.images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${props.title} - Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {props.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Content - 30% height */}
            <div className="p-6 h-[30%]">
              <h3 className="text-xl font-bold mb-2">{props.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{props.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {props.services.map((service, index) => (
                  <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {service}
                  </span>
                ))}
              </div>
              <div className="space-y-1 text-sm text-gray-500">
                <p><strong>Cliente:</strong> {props.details.client}</p>
                <p><strong>Fecha:</strong> {props.details.date}</p>
                <p><strong>Ubicación:</strong> {props.details.location}</p>
              </div>
            </div>

            <button
              onClick={handleFlip}
              className={`absolute bottom-4 right-4 ${
                isDefaultModel ? 'bg-black' : 'bg-red-600'
              } text-white px-4 py-2 text-sm rounded-lg transition-colors`}
            >
              {isDefaultModel ? 'Ver Servicio' : 'Ver Modelo 3D'}
            </button>
          </div>
        </div>

        {/* Back side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white">
          {isDefaultModel ? (
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-4">{props.title}</h3>
              <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-600">Servicio no disponible en este momento</p>
              </div>
            </div>
          ) : (
            <iframe
              src={props.a360Link}
              className="w-full h-full border-0"
              allowFullScreen
            />
          )}
          <button
            onClick={handleFlip}
            className={`absolute bottom-4 right-4 ${
              isDefaultModel ? 'bg-black' : 'bg-red-600'
            } text-white px-4 py-2 text-sm rounded-lg transition-colors`}
          >
            Ver Descripción
          </button>
        </div>
      </div>
    </div>
  );
}