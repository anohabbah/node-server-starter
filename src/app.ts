import 'express-async-errors';

import express from "express";

import { errorHandler, successHandler } from "./loggings/morgan.logging";
import errorMiddleware from "./middlewares/error.middleware";
import routers from './routes';

const app = express();

app.use(successHandler);
app.use(errorHandler);
app.use(express.json());

app.use('/api', routers)

app.use(errorMiddleware);

module.exports = app;
