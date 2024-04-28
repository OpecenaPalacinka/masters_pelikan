import { Pool, PoolClient } from 'pg';

let pool: PoolClient | null = null;

export const getClient = async (): Promise<PoolClient> => {
  try {
    if (!pool) {
      const poolClient = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT as string,10),
      });
      pool = await poolClient.connect()
    }

    return pool;
  } catch (err) {
    console.error('Error connecting to PostgreSQL database:', err);
    throw err;
  }
};
