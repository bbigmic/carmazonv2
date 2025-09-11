'use client';

import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (serviceData: ServiceFormData) => void;
  initialData?: ServiceFormData;
  mode: 'add' | 'edit';
}

export interface ServiceFormData {
  id?: string;
  name: string;
  category: 'mechanika' | 'detaling';
  price: number;
  duration: string;
  description: string;
}

export default function ServiceForm({ isOpen, onClose, onSubmit, initialData, mode }: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>(
    initialData || {
      name: '',
      category: 'mechanika',
      price: 0,
      duration: '',
      description: ''
    }
  );

  // Reset form when switching between add/edit modes
  React.useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '',
          category: 'mechanika',
          price: 0,
          duration: '',
          description: ''
        });
      }
    }
  }, [isOpen, mode, initialData]);

  const [durationError, setDurationError] = useState('');

  const validateDuration = (value: string): boolean => {
    // Format: 1h30m lub 30m
    const regex = /^(\d+h)?(\d+m)?$/;
    if (!regex.test(value)) return false;

    // Sprawdź liczbę minut
    const minutesMatch = value.match(/(\d+)m/);
    if (minutesMatch) {
      const minutes = parseInt(minutesMatch[1]);
      if (minutes > 59) {
        setDurationError('Liczba minut nie może przekraczać 59');
        return false;
      }
    }

    // Sprawdź czy jest przynajmniej jedna godzina lub minuta
    const hasHours = value.includes('h');
    const hasMinutes = value.includes('m');
    if (!hasHours && !hasMinutes) {
      setDurationError('Podaj czas w formacie 1h30m lub 30m');
      return false;
    }

    return true;
  };

  const formatDuration = (value: string): string => {
    // Usuń wszystkie spacje
    value = value.replace(/\s/g, '');
    
    // Jeśli wartość jest pusta, zwróć pusty string
    if (!value) return '';
    
    // Sprawdź czy wartość jest w poprawnym formacie
    if (!validateDuration(value)) {
      return value;
    }
    
    setDurationError('');
    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDuration(formData.duration)) {
      setDurationError('Nieprawidłowy format czasu. Użyj formatu: 1h30m lub 30m');
      return;
    }
    
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'duration') {
      setFormData(prev => ({
        ...prev,
        [name]: formatDuration(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) : value
      }));
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full bg-black max-w-2xl bg-zinc-800 rounded-2xl p-8 shadow-xl border border-zinc-700">
            <Dialog.Title className="text-2xl font-bold text-white mb-6">
              {mode === 'add' ? 'Dodaj nową usługę' : 'Edytuj usługę'}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Nazwa usługi
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
                    Kategoria
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.category}
                    onChange={handleChange}
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
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-white mb-2">
                    Czas trwania (np. 1h30m lub 30m)
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    required
                    placeholder="np. 1h30m lub 30m"
                    className={`w-full px-4 py-3 rounded-lg bg-zinc-700 border ${
                      durationError ? 'border-red-500' : 'border-zinc-600'
                    } text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500`}
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  {durationError && (
                    <p className="mt-1 text-sm text-red-500">{durationError}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                    Opis usługi
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  {mode === 'add' ? 'Dodaj usługę' : 'Zapisz zmiany'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
} 