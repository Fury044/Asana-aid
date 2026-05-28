import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL missing');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log('✅ PostgreSQL Connected'))
  .catch((err) => console.error('❌ PostgreSQL Connection Error:', err));

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
