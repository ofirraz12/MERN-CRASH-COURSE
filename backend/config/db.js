import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

let client;

async function connectDB() {
  if (!client) {
    client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: String(process.env.PG_PASSWORD),
      port: process.env.PG_PORT,
    });

    try {
      await client.connect();
      console.log('Connected to the database');
    } catch (err) {
      console.error('Connection error', err.stack);
    }
  } else {
    console.log('Already connected to the database.');
  }
}

async function closeDB() {
  if (client) {
    await client.end();
    console.log('Database connection closed');
  }
}

export { client, connectDB, closeDB };
