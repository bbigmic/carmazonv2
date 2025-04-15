'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Service {
  id: string;
  name: string;
  category: 'mechanika' | 'detaling';
  price: number;
  duration: string;
  description: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Diagnostyka komputerowa',
    category: 'mechanika',
    price: 150,
    duration: '1h',
    description: 'Kompleksowa diagnostyka pojazdu'
  },
  // Dodaj więcej przykładowych usług
];

export default function ServicesTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsNew(false);
    setIsOpen(true);
  };

  const handleNew = () => {
    setSelectedService(null);
    setIsNew(true);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    // Tutaj dodamy logikę usuwania usługi
    console.log('Usuwanie usługi:', id);
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleNew}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Dodaj usługę
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Nazwa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Kategoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Cena</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Czas trwania</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{service.name}</div>
                  <div className="text-sm text-zinc-400">{service.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-zinc-700 text-white">
                    {service.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {service.price} zł
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {service.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-zinc-400 hover:text-white mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-zinc-800 rounded-2xl p-8 shadow-xl border border-zinc-700">
            <Dialog.Title className="text-2xl font-bold text-white mb-6">
              {isNew ? 'Dodaj nową usługę' : 'Edytuj usługę'}
            </Dialog.Title>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Nazwa usługi
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={selectedService?.name}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
                    Kategoria
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={selectedService?.category}
                  >
                    <option value="mechanika">Mechanika</option>
                    <option value="detaling">Detaling</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-white mb-2">
                    Cena (zł)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={selectedService?.price}
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-white mb-2">
                    Czas trwania
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={selectedService?.duration}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                    Opis
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={selectedService?.description}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  {isNew ? 'Dodaj usługę' : 'Zapisz zmiany'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
} 