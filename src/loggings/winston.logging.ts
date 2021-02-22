import winston from 'winston';
import config from 'config';

const isError = function isError(info: any): info is Error {
  return (info as Error).stack !== undefined;
};

const enumerateErrorFormat = winston.format((info) => {
  if (isError(info)) {
    console.log('enumerateErrorFormat', info.stack);
    Object.assign(info, { message: info.stack });
  }

  return info;
});

const isDev: boolean = config.get('env') === 'development';
export default winston.createLogger({
  level: isDev ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    isDev ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
      handleExceptions: true,
    }),
  ],
});
