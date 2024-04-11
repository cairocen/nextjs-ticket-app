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
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Ticket Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Site Code
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Site Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contact Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contact Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creation Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last State Change Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tickets?.map((ticket) => (
                <tr key={ticket.id} className="w-full border-b border-gray-100 last-of-type:border-none">
                  <td className="px-4 py-5 font-medium sm:pl-6">{ticket.ticket_number}</td>
                  <td className="px-3 py-5 font-medium">{ticket.site_code}</td>
                  <td className="px-3 py-5 font-medium">{ticket.site_name}</td>
                  <td className="px-3 py-5 font-medium">{ticket.contact_name}</td>
                  <td className="px-3 py-5 font-medium">{ticket.contact_phone}</td>
                  <td className="px-3 py-5 font-medium">{formatDateToLocal(ticket.creation_date)}</td>
                  <td className="px-3 py-5 font-medium">
                    <TicketStatus status={ticket.status} />
                  </td>
                  <td className="px-3 py-5 font-medium">{formatDateToLocal(ticket.last_state_change_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
