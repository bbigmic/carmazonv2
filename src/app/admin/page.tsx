'use client';

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { 
  CalendarIcon, 
  WrenchScrewdriverIcon, 
  TruckIcon, 
  ChartBarIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import ServiceForm, { ServiceFormData } from '@/components/admin/ServiceForm';
import CarForm, { CarFormData, CarFormDataInput } from '@/components/admin/CarForm';
import { toast } from 'react-hot-toast';

interface Service extends ServiceFormData {
  id: string;
}

interface Car extends CarFormDataInput {
  id: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCarFormOpen, setIsCarFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchCars();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Błąd podczas pobierania usług');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Nie udało się pobrać listy usług');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars');
      if (!response.ok) throw new Error('Błąd podczas pobierania samochodów');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Nie udało się pobrać listy samochodów');
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsServiceFormOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tę usługę?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Błąd podczas usuwania usługi');
      
      setServices(prev => prev.filter(service => service.id !== id));
      toast.success('Usługa została usunięta');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Nie udało się usunąć usługi');
    }
  };

  const handleServiceSubmit = async (serviceData: ServiceFormData) => {
    try {
      const isEdit = editingService !== null;
      const url = isEdit ? `/api/services/${editingService.id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error(isEdit ? 'Błąd podczas aktualizacji usługi' : 'Błąd podczas dodawania usługi');
      }

      const updatedService = await response.json();
      
      if (isEdit) {
        setServices(prev => prev.map(service => service.id === editingService.id ? updatedService : service));
        toast.success('Usługa została zaktualizowana');
      } else {
        setServices(prev => [updatedService, ...prev]);
        toast.success('Usługa została dodana');
      }

      setEditingService(null);
    } catch (error) {
      console.error('Error submitting service:', error);
      toast.error(editingService ? 'Nie udało się zaktualizować usługi' : 'Nie udało się dodać usługi');
    }
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setIsCarFormOpen(true);
  };

  const handleDeleteCar = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten samochód?')) return;

    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Błąd podczas usuwania samochodu');
      
      setCars(prev => prev.filter(car => car.id !== id));
      toast.success('Samochód został usunięty');
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Nie udało się usunąć samochodu');
    }
  };

  const handleCarSubmit = async (carData: CarFormData) => {
    try {
      const isEdit = editingCar !== null;
      const url = isEdit ? `/api/cars/${editingCar.id}` : '/api/cars';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...carData,
          featured: carData.featured ?? false
        }),
      });

      if (!response.ok) {
        throw new Error(isEdit ? 'Błąd podczas aktualizacji samochodu' : 'Błąd podczas dodawania samochodu');
      }

      const updatedCar = await response.json();
      
      if (isEdit) {
        setCars(prev => prev.map(car => car.id === editingCar.id ? updatedCar : car));
        toast.success('Samochód został zaktualizowany');
      } else {
        setCars(prev => [updatedCar, ...prev]);
        toast.success('Samochód został dodany');
      }

      setEditingCar(null);
    } catch (error) {
      console.error('Error submitting car:', error);
      toast.error(editingCar ? 'Nie udało się zaktualizować samochodu. Możesz promować maksymalnie 3 samochody na raz.' : 'Nie udało się dodać samochodu');
    }
  };

  return (
    <div 
      className="min-h-screen text-white relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/admin-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">Panel Administracyjny</h1> 
        
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-zinc-800/90 backdrop-blur-sm p-1 mb-8 border border-zinc-700 shadow-lg">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-zinc-800 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                    : 'text-zinc-300 hover:bg-zinc-700/80 hover:text-white'
                )
              }
            >
              <div className="flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Wizyty
              </div>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-zinc-800 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                    : 'text-zinc-300 hover:bg-zinc-700/80 hover:text-white'
                )
              }
            >
              <div className="flex items-center justify-center">
                <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
                Usługi
              </div>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-zinc-800 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                    : 'text-zinc-300 hover:bg-zinc-700/80 hover:text-white'
                )
              }
            >
              <div className="flex items-center justify-center">
                <TruckIcon className="w-5 h-5 mr-2" />
                Samochody
              </div>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-zinc-800 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                    : 'text-zinc-300 hover:bg-zinc-700/80 hover:text-white'
                )
              }
            >
              <div className="flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Statystyki
              </div>
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="rounded-xl bg-zinc-800/90 backdrop-blur-sm p-6 border border-zinc-700 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Zarządzanie wizytami</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg shadow-red-500/20">
                  Dodaj wizytę
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Klient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Usługa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">Akcje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700">
                    {/* Tutaj będą wiersze z wizytami */}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>

            <Tab.Panel className="rounded-xl bg-zinc-800/90 backdrop-blur-sm p-6 border border-zinc-700 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Zarządzanie usługami</h2>
                <button 
                  onClick={() => {
                    setEditingService(null);
                    setIsServiceFormOpen(true);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
                >
                  Dodaj usługę
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    className="bg-zinc-700/90 backdrop-blur-sm p-6 rounded-lg border border-zinc-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
                        <p className="text-zinc-300 text-sm mb-2">{service.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-red-500 font-semibold">{service.price} zł</span>
                          <span className="text-zinc-400">{service.duration}</span>
                          <span className="px-2 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">
                            {service.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-2 text-zinc-400 hover:text-white transition-colors"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ServiceForm
                isOpen={isServiceFormOpen}
                onClose={() => {
                  setIsServiceFormOpen(false);
                  setEditingService(null);
                }}
                onSubmit={handleServiceSubmit}
                initialData={editingService || undefined}
                mode={editingService ? 'edit' : 'add'}
              />
            </Tab.Panel>

            <Tab.Panel className="rounded-xl bg-zinc-800/90 backdrop-blur-sm p-6 border border-zinc-700 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Zarządzanie samochodami</h2>
                <button 
                  onClick={() => {
                    setEditingCar(null);
                    setIsCarFormOpen(true);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg shadow-red-500/20"
                >
                  Dodaj samochód
                </button>
              </div>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                  <p className="text-zinc-400 mt-4">Ładowanie samochodów...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <div 
                      key={car.id}
                      className="bg-zinc-700/90 backdrop-blur-sm rounded-lg border border-zinc-600 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                    >
                      {car.images.length > 0 && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={car.images[0]}
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              car.isAvailable 
                                ? 'bg-green-600 text-white' 
                                : 'bg-red-600 text-white'
                            }`}>
                              {car.isAvailable ? 'Dostępny' : 'Niedostępny'}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {car.brand} {car.model}
                        </h3>
                        <div className="space-y-1 text-sm text-zinc-300 mb-4">
                          <p>Rok: {car.year}</p>
                          <p>Przebieg: {car.mileage.toLocaleString()} km</p>
                          <p>Paliwo: {car.fuelType}</p>
                          <p>Skrzynia: {car.transmission}</p>
                          <p>Silnik: {car.engineSize} cm³</p>
                          <p>Kolor: {car.color}</p>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-red-500">
                            {car.price.toLocaleString()} zł
                          </span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                          {car.description}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCar(car)}
                            className="flex-1 p-2 text-zinc-400 hover:text-white transition-colors bg-zinc-800 rounded-lg hover:bg-zinc-700"
                          >
                            <PencilIcon className="w-5 h-5 mx-auto" />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car.id)}
                            className="flex-1 p-2 text-zinc-400 hover:text-red-500 transition-colors bg-zinc-800 rounded-lg hover:bg-zinc-700"
                          >
                            <TrashIcon className="w-5 h-5 mx-auto" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {cars.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <TruckIcon className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                      <p className="text-zinc-400 text-lg">Brak samochodów w ofercie</p>
                      <p className="text-zinc-500 text-sm">Dodaj pierwszy samochód, aby rozpocząć</p>
                    </div>
                  )}
                </div>
              )}

              <CarForm
                isOpen={isCarFormOpen}
                onClose={() => {
                  setIsCarFormOpen(false);
                  setEditingCar(null);
                }}
                onSubmit={handleCarSubmit}
                initialData={editingCar || undefined}
                mode={editingCar ? 'edit' : 'add'}
              />
            </Tab.Panel>

            <Tab.Panel className="rounded-xl bg-zinc-800/90 backdrop-blur-sm p-6 border border-zinc-700 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-lg">Statystyki i raporty</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-zinc-700/90 backdrop-blur-sm p-6 rounded-lg border border-zinc-600 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <h3 className="text-lg font-semibold mb-2 text-white">Liczba wizyt</h3>
                  <p className="text-3xl font-bold text-red-500 drop-shadow-lg">0</p>
                </div>
                <div className="bg-zinc-700/90 backdrop-blur-sm p-6 rounded-lg border border-zinc-600 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <h3 className="text-lg font-semibold mb-2 text-white">Aktywne usługi</h3>
                  <p className="text-3xl font-bold text-red-500 drop-shadow-lg">0</p>
                </div>
                <div className="bg-zinc-700/90 backdrop-blur-sm p-6 rounded-lg border border-zinc-600 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <h3 className="text-lg font-semibold mb-2 text-white">Samochody w ofercie</h3>
                  <p className="text-3xl font-bold text-red-500 drop-shadow-lg">{cars.length}</p>
                </div>
                <div className="bg-zinc-700/90 backdrop-blur-sm p-6 rounded-lg border border-zinc-600 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <h3 className="text-lg font-semibold mb-2 text-white">Przychód (miesiąc)</h3>
                  <p className="text-3xl font-bold text-red-500 drop-shadow-lg">0 zł</p>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
} 