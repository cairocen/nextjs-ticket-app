'use client';

import { SiteField } from '@/app/lib/definitions';
import Link from 'next/link';
import { useState } from 'react';
import {
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { Button } from '@/app/ui/button';
import { createTicket } from '@/app/lib/actions';

type FormProps = {
  sites: SiteField[];
  ticketNumber: string;
}

export default function Form({ sites, ticketNumber }: FormProps) {
  const variant = "bordered";
  const [selectedSite, setSelectedSite] = useState<string | null>('');
  const [inputValue, setInputValue] = useState('');
  type Key = string | number;

  const handleSiteSelection = (key: Key) => {
    if (typeof key === 'string') {
      setSelectedSite(key);
      const selectedSite = sites.find(site => site.id === key);

      if (selectedSite) {
        setInputValue(`${selectedSite.site_code} - ${selectedSite.site_name}`);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <form action={createTicket}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Numero de ticket */}
        <label htmlFor="ticketNumber" className="mb-2 block text-sm font-medium">Número de Ticket:</label>
        <input
          type="text"
          id="ticketNumber"
          defaultValue={ticketNumber}
          className="w-full px-3 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500"
        />
        {/* Site Name */}
        {/* Here Autocomplete from NextUI*/}
        <div className="mb-4">
          <label htmlFor="site" className="mb-2 block text-sm font-medium">Buscar y seleccionar un sitio</label>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Autocomplete variant={variant}
              defaultItems={sites}
              className="max-w-full"
              placeholder="Sitio"
              name="siteId"
              aria-label="Buscar y seleccionar un sitio"
              onSelectionChange={handleSiteSelection}
              onInputChange={handleInputChange}>
              {sites.map((site) => (
                <AutocompleteItem key={site.id} value={site.id}>
                  {`${site.site_code} - ${site.site_name}`}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </div>

        {/*Show site code, site name, site contact name and site phone name here*/}
        {selectedSite && (
          <div className="mt-4 mb-4">
            <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles del sitio seleccionado:</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-base font-semibold text-gray-700">Código de sitio:</p>
                    <p className="text-lg text-blue-700">{sites.find(site => site.id === selectedSite)?.site_code}</p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-700">Nombre de sitio:</p>
                    <p className="text-lg text-blue-700">{sites.find(site => site.id === selectedSite)?.site_name}</p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-700">Nombre contacto sitio:</p>
                    <p className="text-lg text-blue-700">{sites.find(site => site.id === selectedSite)?.contact_name}</p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-700">Teléfono contacto sitio:</p>
                    <p className="text-lg text-blue-700">{sites.find(site => site.id === selectedSite)?.contact_phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            placeholder="Describa el problema o incidente"
          ></textarea>
        </div>

        {/* Upload Images */}
        <div className="mb-4">
          <label htmlFor="images" className="mb-2 block text-sm font-medium">
            Subir imágenes
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            multiple
          />
        </div>

        {/* Email addresses */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Correo electrónico a notificar
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            placeholder="Escriba las direcciones de correo, separadas por comas"
          />
        </div>

        {/* Ticket Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Establecer el estado del ticket
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="open"
                  name="status"
                  type="radio"
                  value="open"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="open"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Abierto <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="registered"
                  name="status"
                  type="radio"
                  value="registered"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="registered"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Registrado
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="updated"
                  name="status"
                  type="radio"
                  value="updated"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="updated"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Actualizado
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="closed"
                  name="status"
                  type="radio"
                  value="closed"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="closed"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Cerrado <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tickets"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Ticket</Button>
      </div>
    </form >
  );
}