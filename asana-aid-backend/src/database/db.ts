import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing');
}

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString,

  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL error:', err);
});

export const query = async (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
