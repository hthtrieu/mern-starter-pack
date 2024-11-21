import { Router } from 'express';

import { AsyncHandler } from '../../common/utils/AsyncHandler';
import isValidKey from '../middlewares/VerifyApiKey';
import authRouter from './auth/auth.router';
import storageRouter from './storage/storage.router';
import userRouter from './user/user.router';

const router = Router();
// router.use(isValidKey);
// router.use(AsyncHandler);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/storage', storageRouter);
export default router;
