import { CheckBadgeIcon, ChatBubbleOvalLeftEllipsisIcon, ArrowsUpDownIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TicketStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'open',
          'bg-blue-500 text-white': status === 'registered',
          'bg-yellow-500 text-white': status === 'updated',
          'bg-red-500 text-white': status === 'closed',
        },
      )}
    >
      {status === 'open' ? (
        <>
          Open
          <CheckBadgeIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'registered' ? (
        <>
          Registered
          <ChatBubbleOvalLeftEllipsisIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'updated' ? (
        <>
          Updated
          <ArrowsUpDownIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'closed' ? (
        <>
          Closed
          <XCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}