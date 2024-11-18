import 'dotenv/config';

export interface DatabaseConfig {
  host: string;
  port: string | number;
  database: string;
  username: string;
  password: string;
}

export const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'default_db',
  username: process.env.DB_USERNAME || 'default_user',
  password: process.env.DB_PASSWORD || 'default_password',
};
