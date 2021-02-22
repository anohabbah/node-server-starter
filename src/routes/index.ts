import { Router } from 'express'

import logRouter from './log.route';

const router = Router();

router.use('/log', logRouter);

export default router;
