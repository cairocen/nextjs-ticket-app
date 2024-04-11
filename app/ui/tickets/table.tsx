import { UpdateTicket, DeleteTicket } from '@/app/ui/tickets/buttons';
import TicketStatus from '@/app/ui/tickets/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredTickets } from '@/app/lib/data';

export default async function TicketsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tickets = await fetchFilteredTickets(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tickets?.map((ticket) => (
              <div key={ticket.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{ticket.ticket_number}</p>
                    </div>
                    <p className="text-sm text-gray-500">{ticket.site_code}</p>
                  </div>
                  <TicketStatus status={ticket.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{ticket.contact_name}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTicket id={ticket.id} />
                    <DeleteTicket id={ticket.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Número de Ticket
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Código de Sitio
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre de Sitio
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre de Contacto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Teléfono de Contacto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha de Creación
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha de Último Cambio de Estado
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tickets?.map((ticket, index) => (
                <tr key={ticket.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="px-4 py-2 sm:pl-6 text-sm text-gray-800">{ticket.ticket_number}</td>
                  <td className="px-3 py-2 text-sm text-gray-800">{ticket.site_code}</td>
                  <td className="px-3 py-2 text-sm text-gray-800">{ticket.site_name}</td>
                  <td className="px-3 py-2 text-sm text-gray-800">{ticket.contact_name}</td>
                  <td className="px-3 py-2 text-sm text-gray-800">{ticket.contact_phone}</td>
                  <td className="px-3 py-2 text-sm text-gray-800">{formatDateToLocal(ticket.creation_date)}</td>
                  <td className="px-3 py-2 text-sm">
                    <TicketStatus status={ticket.status} />
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-800">{formatDateToLocal(ticket.last_state_change_date)}</td>
                  <td className="px-3 py-2">
                    <div className="flex justify-end gap-2">
                      <UpdateTicket id={ticket.id} />
                      <DeleteTicket id={ticket.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}