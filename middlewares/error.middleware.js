const logger = require('../loggings/winston.logging');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, _) => {
  logger.error(err.message, [err]);
  res.status(500).send('Something went wrong !');
};
