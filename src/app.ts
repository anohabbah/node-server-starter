import 'express-async-errors';

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import createHttpError from 'http-errors';

import { errorHandler, successHandler } from './loggings/morgan.logging';
import errorMiddleware from './middlewares/error.middleware';
import routers from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use(successHandler);
app.use(errorHandler);

app.use('/api', routers);
app.use((req, res, next) => {
  next(new createHttpError.NotFound());
});

app.use(errorMiddleware);

module.exports = app;
