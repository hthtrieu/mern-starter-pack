import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { PasswordResetOtps } from './entity/PasswordResetOtps';
import { User } from './entity/User';
import { MainSeeder } from './seeder/Seeder';

dotenv.config();
const env = String(process.env.NODE_ENV);

let options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  entities: [
    User,
    PasswordResetOtps,
  ],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  synchronize: true,
  logging: false,
  subscribers: [],
  seeds: [MainSeeder],
};
if (env === 'production' || env === 'delopment') {
  options = {
    ...options,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export const AppDataSource = new DataSource(options);
