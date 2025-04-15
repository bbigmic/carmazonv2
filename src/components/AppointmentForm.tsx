'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface Service {
  id: string;
  name: string;
  category: string;
}

const services: Service[] = [
  { id: 'mechanika-diagnostyka', name: 'Diagnostyka', category: 'Mechanika' },
  { id: 'mechanika-naprawy', name: 'Naprawy', category: 'Mechanika' },
  { id: 'mechanika-serwis', name: 'Serwis', category: 'Mechanika' },
  { id: 'detaling-mycie', name: 'Mycie', category: 'Detaling' },
  { id: 'detaling-pielegnacja', name: 'Pielęgnacja', category: 'Detaling' },
  { id: 'detaling-renowacja', name: 'Renowacja', category: 'Detaling' },
];

export default function AppointmentForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tutaj dodamy logikę wysyłania formularza
    console.log('Form data:', formData);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg animate-bounce-in group"
      >
        <span className="group-hover:translate-x-1 transition-transform inline-block">
          Umów Wizytę
        </span>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-black rounded-2xl p-8 shadow-xl border border-zinc-800">
            <Dialog.Title className="text-2xl font-bold text-white mb-6">
              Umów Wizytę
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Imię i Nazwisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Numer Telefonu
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-white mb-2">
                    Usługa
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Wybierz usługę</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.category} - {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-white mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-white mb-2">
                    Godzina
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Dodatkowe informacje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Umów Wizytę
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
} 