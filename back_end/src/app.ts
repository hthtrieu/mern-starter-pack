import 'reflect-metadata';

import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';

import {
  ApiError,
  ErrorType,
  InternalError,
  NotFoundError,
} from './common/utils/ApiError';
import { AppDataSource } from './database/data-source';
import router from './routers/index.router';

dotenv.config();

const app: Application = express();

// //load dependency
// dependencyInjector();

// Database connection
const connectToDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.log(error);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectToDatabase, 5000);
  }
};

connectToDatabase();

// Swagger
try {
  const file = fs.readFileSync(
    path.resolve(__dirname, '../docs/swagger.yaml'),
    'utf8',
  );
  const swaggerDocument = YAML.parse(file);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (error) {}

//cors
const corsOptions = {
  origin: String(process.env.CLIENT_URL),
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport
app.use(
  session({
    secret: String(process.env.SESSION_KEY),
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);
// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    console.log('error', err);
    // if (err.type === ErrorType.INTERNAL)
    // Logger.error(
    //     `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    // );
  } else {
    // Logger.error(
    //     `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    // );
    // Logger.error(err);
    // if (environment === 'development') {
    //     return res.status(500).send(err);
    // }
    ApiError.handle(new InternalError(), res);
    console.log('error', err);
  }
});

export default app;
