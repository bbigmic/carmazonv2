'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactButton from './ContactButton';

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  color: string;
  description: string;
  images: string[];
  isAvailable: boolean;
  featured: boolean;
}

export default function CarsSection() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
          console.warn('API call failed, showing fallback content');
          setCars([]); // Set empty array instead of throwing error
          return;
        }
        const data = await response.json();
        // Pokaż tylko dostępne i promowane samochody
        setCars(data.filter((car: Car) => car.isAvailable && car.featured));
      } catch (error) {
        console.error('Error fetching cars:', error);
        setCars([]); // Set empty array instead of setting error
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
        <p className="text-zinc-400 mt-4">Ładowanie samochodów...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
        <ContactButton />
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center">
        <p className="text-zinc-400 mb-6 text-white">
          Aktualnie nie mamy promowanych samochodów. 
          Sprawdź naszą pełną ofertę poniżej.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/cars"
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Pokaż pełną ofertę
          </Link>
          <ContactButton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div 
            key={car.id} 
            className="bg-zinc-800 rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {car.images.length > 0 && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Dostępny
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {car.brand} {car.model}
              </h3>
              
              <div className="space-y-1 text-sm text-zinc-400 mb-4">
                <p>Rok: {car.year}</p>
                <p>Przebieg: {car.mileage.toLocaleString()} km</p>
                <p>Paliwo: {car.fuelType}</p>
                <p>Skrzynia: {car.transmission}</p>
              </div>
              
              <p className="text-zinc-300 mb-4 text-sm line-clamp-2">
                {car.description}
              </p>
              
              <div className="flex flex-col space-y-3">
                <div className="text-center">
                  <span className="text-2xl font-bold text-red-600">
                    {car.price.toLocaleString()} zł
                  </span>
                </div>
                <Link 
                  href={`/cars/${car.id}`}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium text-center block"
                >
                  Szczegóły
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-zinc-400 mb-4">
          {cars.length > 0 
            ? `Zobacz wszystkie samochody w naszej ofercie`
            : `Sprawdź naszą pełną ofertę samochodów`
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/cars"
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Pokaż pełną ofertę
          </Link>
          <ContactButton />
        </div>
      </div>
    </div>
  );
}
