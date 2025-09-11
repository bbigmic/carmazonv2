'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

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
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    transmission: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania samochodów');
        }
        const data = await response.json();
        const availableCars = data.filter((car: Car) => car.isAvailable);
        setCars(availableCars);
        setFilteredCars(availableCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let filtered = [...cars];

    // Filtry
    if (filters.brand) {
      filtered = filtered.filter(car => 
        car.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }
    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseInt(filters.maxPrice));
    }
    if (filters.minYear) {
      filtered = filtered.filter(car => car.year >= parseInt(filters.minYear));
    }
    if (filters.maxYear) {
      filtered = filtered.filter(car => car.year <= parseInt(filters.maxYear));
    }

    // Sortowanie
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'mileage-low':
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage-high':
        filtered.sort((a, b) => b.mileage - a.mileage);
        break;
    }

    setFilteredCars(filtered);
  }, [cars, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      brand: '',
      fuelType: '',
      transmission: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: ''
    });
  };

  const getUniqueBrands = () => {
    return [...new Set(cars.map(car => car.brand))].sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white">Ładowanie oferty samochodów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center text-white hover:text-red-400 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Powrót do strony głównej
            </Link>
            <h1 className="text-2xl font-bold text-white">Pełna oferta samochodów</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtry */}
          <div className="lg:w-1/4">
            <div className="bg-zinc-900 rounded-2xl p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Filtry</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-zinc-400 hover:text-white"
                >
                  <FunnelIcon className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Marka */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Marka</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Wszystkie marki</option>
                    {getUniqueBrands().map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Rodzaj paliwa */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Rodzaj paliwa</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Wszystkie</option>
                    <option value="benzyna">Benzyna</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybryda">Hybryda</option>
                    <option value="elektryczny">Elektryczny</option>
                    <option value="gaz">Gaz</option>
                  </select>
                </div>

                {/* Skrzynia biegów */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Skrzynia biegów</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Wszystkie</option>
                    <option value="manualna">Manualna</option>
                    <option value="automatyczna">Automatyczna</option>
                    <option value="półautomatyczna">Półautomatyczna</option>
                  </select>
                </div>

                {/* Cena */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Cena (zł)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Od"
                      value={filters.minPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                      className="px-3 py-2 rounded-lg bg-white border border-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="number"
                      placeholder="Do"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                      className="px-3 py-2 rounded-lg bg-white border border-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Rok produkcji */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Rok produkcji</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Od"
                      value={filters.minYear}
                      onChange={(e) => setFilters(prev => ({ ...prev, minYear: e.target.value }))}
                      className="px-3 py-2 rounded-lg bg-white border border-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="number"
                      placeholder="Do"
                      value={filters.maxYear}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxYear: e.target.value }))}
                      className="px-3 py-2 rounded-lg bg-white border border-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Wyczyść filtry
                </button>
              </div>
            </div>
          </div>

          {/* Lista samochodów */}
          <div className="lg:w-3/4">
            {/* Sortowanie i liczba wyników */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-zinc-400 mb-4 sm:mb-0">
                Znaleziono {filteredCars.length} samochod{filteredCars.length === 1 ? '' : filteredCars.length < 5 ? 'y' : 'ów'}
              </p>
              <div className="flex items-center space-x-4">
                <label className="text-white text-sm">Sortuj według:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white border border-zinc-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="newest">Najnowsze</option>
                  <option value="oldest">Najstarsze</option>
                  <option value="price-low">Cena: od najniższej</option>
                  <option value="price-high">Cena: od najwyższej</option>
                  <option value="mileage-low">Przebieg: od najniższego</option>
                  <option value="mileage-high">Przebieg: od najwyższego</option>
                </select>
              </div>
            </div>

            {/* Karty samochodów */}
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-400 text-lg mb-4">Nie znaleziono samochodów spełniających kryteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Wyczyść filtry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
