const { Pool } = require('pg');
const {
  invoices,
  customers,
  revenue,
  users,
  sites,
  tickets,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

// Función para seedUsers
async function seedUsers(client) {
  try {
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.query(`
          INSERT INTO users (id, name, email, password)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO NOTHING;
        `, [user.id, user.name, user.email, hashedPassword]);
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

// Function for seedInvoices
async function seedInvoices(client) {
  try {
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `);

    console.log(`Created "invoices" table`);

    const insertedInvoices = await Promise.all(
      invoices.map((invoice) => client.query(`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `, [invoice.customer_id, invoice.amount, invoice.status, invoice.date]))
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

// Function for seedCustomers
async function seedCustomers(client) {
  try {
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `);

    console.log(`Created "customers" table`);

    const insertedCustomers = await Promise.all(
      customers.map((customer) => client.query(`
        INSERT INTO customers (id, name, email, image_url)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `, [customer.id, customer.name, customer.email, customer.image_url]))
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

// Function for seeding tickets
async function seedTickets(client) {
  try {
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        site_id UUID NOT NULL,
        ticket_number VARCHAR(255) NOT NULL,
        issue TEXT NOT NULL,
        images TEXT[] NOT NULL,
        notification_email VARCHAR(255) NOT NULL,
        creation_date DATE NOT NULL,
        status VARCHAR(255) NOT NULL,
        last_state_change_date DATE NOT NULL
      );
    `);

    console.log(`Created "tickets" table`);

    const insertedTickets = await Promise.all(
      tickets.map((ticket) => client.query(`
        INSERT INTO tickets (site_id, ticket_number, issue, images, notification_email, creation_date, status, last_state_change_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO NOTHING;
      `, [ticket.site_id, ticket.ticket_number, ticket.issue, ticket.images, ticket.notification_email, ticket.creation_date, ticket.status, ticket.last_state_change_date]))
    );

    console.log(`Seeded ${insertedTickets.length} tickets`);

    return {
      createTable,
      tickets: insertedTickets,
    };
  } catch (error) {
    console.error('Error seeding tickets:', error);
    throw error;
  }
}

// Function for seeding sites
async function seedSites(client) {
  try {
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS sites (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        lot VARCHAR(255) NOT NULL,
        site_code VARCHAR(255) NOT NULL,
        site_name VARCHAR(255) NOT NULL,
        site_type VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        municipality VARCHAR(255) NOT NULL,
        village VARCHAR(255),
        bandwidth VARCHAR(255) NOT NULL,
        service_value NUMERIC(10, 2) NOT NULL,  -- Accepts numeric values with 10 digits and 2 decimals
        contact_name VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(255) NOT NULL,
        contract_number VARCHAR(255)
      );
    `);

    console.log(`Created "sites" table`);

    const insertedSites = await Promise.all(
      sites.map((site) => client.query(`
        INSERT INTO sites (id, lot, site_code, site_name, site_type, department, municipality, village, bandwidth, service_value, contact_name, contact_phone, contract_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO NOTHING;
      `, [site.id, site.lot, site.site_code, site.site_name, site.site_type, site.department, site.municipality, site.village, site.bandwidth, parseFloat(site.service_value), site.contact_name, site.contact_phone, site.contract_number]))
    );

    console.log(`Seeded ${insertedSites.length} sites`);

    return {
      createTable,
      sites: insertedSites,
    };
  } catch (error) {
    console.error('Error seeding sites:', error);
    throw error;
  }
}

// Función para seedRevenue
async function seedRevenue(client) {
  try {
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `);

    console.log(`Created "revenue" table`);

    const insertedRevenue = await Promise.all(
      revenue.map((rev) => client.query(`
        INSERT INTO revenue (month, revenue)
        VALUES ($1, $2)
        ON CONFLICT (month) DO NOTHING;
      `, [rev.month, rev.revenue]))
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}
async function main() {
  const client = await pool.connect();

  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);
  await seedSites(client);
  await seedTickets(client);

  await client.release();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
