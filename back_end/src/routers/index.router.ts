import { Router } from 'express';

import isValidKey from '../middlewares/VerifyApiKey';
import userRouter from './user/user.router';

const router = Router();
router.use(isValidKey);
router.use('/users', userRouter);
export default router;
