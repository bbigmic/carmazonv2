'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Appointment {
  id: string;
  date: string;
  time: string;
  client: string;
  service: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const appointments: Appointment[] = [
  {
    id: '1',
    date: '2024-03-20',
    time: '10:00',
    client: 'Jan Kowalski',
    service: 'Mechanika - Diagnostyka',
    status: 'pending'
  },
  // Dodaj więcej przykładowych wizyt
];

export default function AppointmentsTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    // Tutaj dodamy logikę usuwania wizyty
    console.log('Usuwanie wizyty:', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Klient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Usługa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{appointment.date}</div>
                  <div className="text-sm text-zinc-400">{appointment.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{appointment.client}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{appointment.service}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)} text-white`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  <button
                    onClick={() => handleEdit(appointment)}
                    className="text-zinc-400 hover:text-white mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
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
              Edytuj wizytę
            </Dialog.Title>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-white mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={selectedAppointment?.date}
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
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={selectedAppointment?.time}
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={selectedAppointment?.status}
                  >
                    <option value="pending">Oczekująca</option>
                    <option value="confirmed">Potwierdzona</option>
                    <option value="completed">Zakończona</option>
                    <option value="cancelled">Anulowana</option>
                  </select>
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
                  Zapisz zmiany
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
} 