import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL;

if (!connectionString && !process.env.DB_HOST) {
  throw new Error(
    'Database configuration missing. Set DATABASE_URL or DATABASE_PUBLIC_URL on the backend service.'
  );
}

const pool = new Pool(
  connectionString
    ? { connectionString }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
      }
);

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
