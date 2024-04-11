// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Ticket = {
  id: string;
  site_id: string;
  ticket_number: string;
  issue: string;
  images: string[]; // Array of image URLs
  notification_email: string;
  creation_date: string;
  status: 'open' | 'registered' | 'updated' | 'closed';
  last_state_change_date: string;
};

export type Site = {
  id: string;
  lot: string;
  site_code: string;
  site_name: string;
  site_type: string;
  department: string;
  municipality: string;
  village: string;
  bandwidth: string;
  service_value: number;
  contact_name: string;
  contact_phone: string;
  contract_number: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestTicket = {
  id: string;
  lot: string;
  site_code: string;
  site_name: string;
  site_type: string;
  department: string;
  municipality: string;
  village: string;
  bandwidth: string;
  service_value: number;
  contact_name: string;
  contact_phone: string;
  contract_number: string;
  creation_date: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type TicketsTable = {
  id: string;
  ticket_number: string;
  site_code: string;
  site_name: string;
  contact_name: string;
  contact_phone: string;
  creation_date: string;
  status: 'open' | 'registered' | 'updated' | 'closed';
  last_state_change_date: string;
}

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type SiteField = {
  id: string;
  site_code: string;
  site_name: string;
  contact_name: string;
  contact_phone: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type TicketForm = {
  id: string;
  site_id: string;
  ticket_number: string;
  issue: string;
  images: string[]; // Array of image URLs
  notification_email: string;
  status: 'open' | 'registered' | 'updated' | 'closed';
};
