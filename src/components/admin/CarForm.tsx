'use client';

import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface CarFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (carData: CarFormData) => void;
  initialData?: CarFormDataInput;
  mode: 'add' | 'edit';
}

export interface CarFormData {
  id?: string;
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

export interface CarFormDataInput {
  id?: string;
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
  featured?: boolean; // Opcjonalne dla starych danych
}

export default function CarForm({ isOpen, onClose, onSubmit, initialData, mode }: CarFormProps) {
  const [formData, setFormData] = useState<CarFormData>(() => {
    if (initialData) {
      return {
        ...initialData,
        featured: initialData.featured ?? false
      };
    }
    return {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: 'benzyna',
      transmission: 'manualna',
      engineSize: '',
      color: '',
      description: '',
      images: [],
      isAvailable: true,
      featured: false
    };
  });

  // Reset form when switching between add/edit modes
  React.useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({
          ...initialData,
          featured: initialData.featured ?? false
        });
      } else {
        setFormData({
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          price: 0,
          mileage: 0,
          fuelType: 'benzyna',
          transmission: 'manualna',
          engineSize: '',
          color: '',
          description: '',
          images: [],
          isAvailable: true,
          featured: false
        });
      }
    }
  }, [isOpen, mode, initialData]);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : type === 'number' 
          ? parseFloat(value) || 0
          : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadPromises = Array.from(files).map(async (file, index) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Błąd podczas uploadu');
        }

        const result = await response.json();
        setUploadProgress(((index + 1) / files.length) * 100);
        return result.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Błąd podczas uploadu:', error);
      alert('Wystąpił błąd podczas uploadu zdjęć');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
          <Dialog.Panel className="w-full max-w-4xl bg-black rounded-2xl p-8 shadow-xl border border-zinc-800">
            <Dialog.Title className="text-2xl font-bold text-white mb-6">
              {mode === 'add' ? 'Dodaj nowy samochód' : 'Edytuj samochód'}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-white mb-2">
                    Marka
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-white mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-white mb-2">
                    Rok produkcji
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.year}
                    onChange={handleChange}
                  />
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
                    step="100"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="mileage" className="block text-sm font-medium text-white mb-2">
                    Przebieg (km)
                  </label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    required
                    min="0"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.mileage}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="fuelType" className="block text-sm font-medium text-white mb-2">
                    Rodzaj paliwa
                  </label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.fuelType}
                    onChange={handleChange}
                  >
                    <option value="benzyna">Benzyna</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybryda">Hybryda</option>
                    <option value="elektryczny">Elektryczny</option>
                    <option value="gaz">Gaz</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-white mb-2">
                    Skrzynia biegów
                  </label>
                  <select
                    id="transmission"
                    name="transmission"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.transmission}
                    onChange={handleChange}
                  >
                    <option value="manualna">Manualna</option>
                    <option value="automatyczna">Automatyczna</option>
                    <option value="półautomatyczna">Półautomatyczna</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="engineSize" className="block text-sm font-medium text-white mb-2">
                    Pojemność silnika (cm³)
                  </label>
                  <input
                    type="text"
                    id="engineSize"
                    name="engineSize"
                    required
                    placeholder="np. 2000"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.engineSize}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-white mb-2">
                    Kolor
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={handleChange}
                        className="mr-2 rounded border-zinc-600 bg-zinc-800 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-white">Dostępny w sprzedaży</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="mr-2 rounded border-zinc-600 bg-zinc-800 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-white">Promowane na stronie głównej</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                    Opis
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

                {/* Upload zdjęć */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    Zdjęcia samochodu
                  </label>
                  
                  <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                        uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-800/50'
                      }`}
                    >
                      <PhotoIcon className="w-12 h-12 text-zinc-400" />
                      <span className="text-zinc-400">
                        {uploading ? 'Uploadowanie...' : 'Kliknij aby wybrać zdjęcia'}
                      </span>
                      {uploading && (
                        <div className="w-full bg-zinc-700 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Podgląd zdjęć */}
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={image}
                            alt={`Samochód ${index + 1}`}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {mode === 'add' ? 'Dodaj samochód' : 'Zapisz zmiany'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
