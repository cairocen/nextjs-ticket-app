import Form from '@/app/ui/tickets/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchSites, getLastTicketNumber } from '@/app/lib/data';

export default async function Page() {
    const sites = await fetchSites();

    const generateTicketNumber = async () => {
        let tempLasTicketNumber = await getLastTicketNumber();

        if (typeof tempLasTicketNumber !== 'number') {
            throw new Error('Last ticket number is not a valid number');
        }

        const prefix = 'TD-';
        tempLasTicketNumber++;
        const ticketNum = tempLasTicketNumber.toString().padStart(6, '0');

        if (!/TD-\d{6}/.test(prefix + ticketNum)) {
            throw new Error('Invalid ticket number format');
        }

        return `${prefix}${ticketNum}`;
    }

    const ticketNumber = await generateTicketNumber();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Tickets', href: '/dashboard/tickets' },
                    {
                        label: 'Create Ticket',
                        href: '/dashboard/tickets/create',
                        active: true,
                    },
                ]}
            />
            <Form sites={sites} ticketNumber={ticketNumber} />
        </main>
    );
}