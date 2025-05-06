'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/AutoSpectrum_logo copy.png"
                alt="Grupa Auto Spectrum Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className={`ml-2 text-xl font-bold ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>Grupa Auto Spectrum</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
            <Link 
                href="#sprzedaz" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
                }`}
              >
                Sprzedaż
              </Link>
              <Link 
                href="#detailing" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
                }`}
              >
                Detailing
              </Link>
              <Link 
                href="#mechanika" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
                }`}
              >
                Mechanika
              </Link>
              <Link 
                href="#laweta" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
                }`}
              >
                Laweta
              </Link>
              <Link 
                href="#footer" 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-md ${
                  isScrolled
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white/90 backdrop-blur-sm text-red-500 hover:bg-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const footer = document.getElementById('footer');
                  const phoneNumber = document.getElementById('phone-number');
                  footer?.scrollIntoView({ behavior: 'smooth' });
                  phoneNumber?.classList.add('animate-pulse', 'text-red-500');
                  setTimeout(() => {
                    phoneNumber?.classList.remove('animate-pulse', 'text-red-500');
                  }, 3000);
                }}
              >
                Kontakt
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
              }`}
            >
              <span className="sr-only">Otwórz menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      } ${isScrolled ? 'bg-white' : 'bg-black'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="#mechanika" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
            }`}
          >
            Mechanika
          </Link>
          <Link 
            href="#detailing" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
            }`}
          >
            detailing
          </Link>
          <Link 
            href="#sprzedaz" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
            }`}
          >
            Sprzedaż
          </Link>
          <Link 
            href="#laweta" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
            }`}
          >
            Laweta
          </Link>
          <Link 
            href="#footer" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isScrolled ? 'text-black hover:text-red-600' : 'text-white hover:text-red-400'
            }`}
            onClick={(e) => {
              e.preventDefault();
              const footer = document.getElementById('footer');
              const phoneNumber = document.getElementById('phone-number');
              footer?.scrollIntoView({ behavior: 'smooth' });
              phoneNumber?.classList.add('animate-pulse', 'text-red-500');
              setTimeout(() => {
                phoneNumber?.classList.remove('animate-pulse', 'text-red-500');
              }, 3000);
            }}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
} 