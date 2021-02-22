import { Router } from "express";
import logger from '../loggings/winston.logging';

const router = Router();

router.get('/', () => {
  logger.info('log feature.');
})

export default router;
