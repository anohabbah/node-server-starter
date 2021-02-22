import { ErrorRequestHandler, Request, Response, NextFunction} from 'express';
import logger from "../loggings/winston.logging";

// eslint-disable-next-line no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err, req: Request, res: Response, _: NextFunction) => {
  logger.error(err.message, [err]);
  res.status(500).send('Something went wrong !');
};

export default errorMiddleware;
