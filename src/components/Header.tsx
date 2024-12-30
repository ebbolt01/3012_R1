import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { projectCategories } from '../data/projects';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path.startsWith('/#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(path.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(path.substring(1));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavigation('/')}
              className="text-white hover:text-red-600 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavigation('/#about')}
              className="text-white hover:text-red-600 transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => handleNavigation('/#services')}
              className="text-white hover:text-red-600 transition-colors"
            >
              Servicios
            </button>
            <div className="relative group">
              <button 
                className="text-white hover:text-red-600 transition-colors flex items-center space-x-1"
              >
                <span>Proyectos</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-black rounded-lg shadow-xl py-2 hidden group-hover:block">
                {projectCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleNavigation(`/proyectos/${category.id}`)}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-red-600 transition-colors"
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleNavigation('/#contact')}
              className="text-white hover:text-red-600 transition-colors"
            >
              Contacto
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}