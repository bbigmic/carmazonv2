'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

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

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/');
            return;
          }
          throw new Error('Błąd podczas pobierania samochodu');
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
        toast.error('Nie udało się pobrać szczegółów samochodu');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCar();
    }
  }, [params.id, router]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tutaj można dodać logikę wysyłania wiadomości
    toast.success('Wiadomość została wysłana! Skontaktujemy się z Tobą wkrótce.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white">Ładowanie szczegółów samochodu...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Samochód nie został znaleziony</h1>
          <Link href="/" className="text-red-500 hover:text-red-400">
            Powrót do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-red-400 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Powrót
            </button>
            <Link href="/" className="text-white hover:text-red-400 transition-colors">
              Grupa Auto Spectrum
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria zdjęć */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-12 bg-zinc-800 rounded-2xl overflow-hidden">
              {car.images.length > 0 ? (
                <Image
                  src={car.images[selectedImage]}
                  alt={`${car.brand} ${car.model}`}
                  width={800}
                  height={600}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-400">Brak zdjęć</span>
                </div>
              )}
            </div>
            
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-16 aspect-h-12 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-red-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${car.brand} ${car.model} ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Szczegóły samochodu */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-2xl text-red-500 font-bold mb-4">
                {car.price.toLocaleString()} zł
              </p>
              <div className="flex items-center mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  car.isAvailable 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {car.isAvailable ? 'Dostępny' : 'Niedostępny'}
                </span>
              </div>
            </div>

            {/* Dane techniczne */}
            <div className="bg-zinc-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Dane techniczne</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-zinc-400 text-sm">Rok produkcji</span>
                  <p className="text-white font-semibold">{car.year}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-sm">Przebieg</span>
                  <p className="text-white font-semibold">{car.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-sm">Rodzaj paliwa</span>
                  <p className="text-white font-semibold">{car.fuelType}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-sm">Skrzynia biegów</span>
                  <p className="text-white font-semibold">{car.transmission}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-sm">Pojemność silnika</span>
                  <p className="text-white font-semibold">{car.engineSize} cm³</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-sm">Kolor</span>
                  <p className="text-white font-semibold">{car.color}</p>
                </div>
              </div>
            </div>

            {/* Opis */}
            <div className="bg-zinc-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Opis</h2>
              <p className="text-zinc-300 leading-relaxed">{car.description}</p>
            </div>

            {/* Formularz kontaktowy */}
            <div className="bg-zinc-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Skontaktuj się z nami</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Numer telefonu
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Napisz wiadomość dotyczącą tego samochodu..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>

            {/* Informacje kontaktowe */}
            <div className="bg-zinc-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Kontakt</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-red-500 mr-3" />
                  <a href="tel:+48662061106" className="text-white hover:text-red-400 transition-colors">
                    +48 662 061 106
                  </a>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="w-5 h-5 text-red-500 mr-3" />
                  <a href="mailto:kontakt@GrupaAutoSpectrum.pl" className="text-white hover:text-red-400 transition-colors">
                    kontakt@GrupaAutoSpectrum.pl
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 text-red-500 mr-3" />
                  <span className="text-white">ul. Dobrzyńska 91, 42-200 Częstochowa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
