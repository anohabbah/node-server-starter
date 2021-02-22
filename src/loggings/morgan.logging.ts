import morgan from 'morgan';
import config from 'config';
import { Request, Response } from 'express';

import logger from './winston.logging';

morgan.token(
  'message',
  (_: Request, res: Response<any, Record<string, string>>): string => res.locals.errorMessage || ''
);

const getIPFormat = () => (config.get('env') === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIPFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIPFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (_, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (_, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});
