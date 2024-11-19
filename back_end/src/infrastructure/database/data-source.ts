import 'reflect-metadata';
import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { DatabaseConfig } from '../../config/database.config';
import { MainSeeder } from './seeds/seeder';

// let options: DataSourceOptions & SeederOptions = {
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
//   dropSchema: false,
//   // keepConnectionAlive: true,
//   logging: process.env.NODE_ENV !== 'production',
//   entities: [__dirname + '../entities/*.{ts,js}'],
//   migrations: [__dirname + '../migrations/*.{ts,js}'],

//   // cli: {
//   //   migrationsDir: 'src/migrations',
//   //   entitiesDir: 'src/entities',
//   // },
//   extra: {
//     // based on https://node-postgres.com/api/pool
//     // max connection pool size
//     max: process.env.DATABASE_MAX_CONNECTIONS
//       ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
//       : 100,
//     ssl:
//       process.env.DATABASE_SSL_ENABLED === 'true'
//         ? {
//             rejectUnauthorized:
//               process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
//             ca: process.env.DATABASE_CA ?? undefined,
//             key: process.env.DATABASE_KEY ?? undefined,
//             cert: process.env.DATABASE_CERT ?? undefined,
//           }
//         : undefined,
//   },
//   seeds: [MainSeeder],
// };

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false, // Đừng tự động đồng bộ hóa DB
  logging: false,
  entities: [__dirname + '/../entities/*.ts'], // Đường dẫn tới các entity
  migrations: [__dirname + '/migrations/*.ts'], // Đường dẫn tới các migrations
  seeds: [MainSeeder],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations', // Thư mục chứa migrations
    entitiesDir: 'src/infrastructure/database/entities', // Thư mục chứa entities
  },
  extra: {
    // based on https://node-postgres.com/api/pool
    // max connection pool size
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    ssl:
      process.env.DATABASE_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized:
              process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
            ca: process.env.DATABASE_CA ?? undefined,
            key: process.env.DATABASE_KEY ?? undefined,
            cert: process.env.DATABASE_CERT ?? undefined,
          }
        : undefined,
  },
} as DataSourceOptions);
