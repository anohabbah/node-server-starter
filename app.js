require('express-async-errors');
const express = require('express');

const { errorHandler, successHandler } = require('./loggings/morgan.logging');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(successHandler);
app.use(errorHandler);
app.use(express.json());

app.use(errorMiddleware);

module.exports = app;
