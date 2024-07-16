import { Router } from 'express';
import isValidKey from '@src/middleware/VerifyApiKey';
import authRoutes from '@routers/auth/index';
import passportRouter from '@routers/passport/index';
import userRouter from '@routers/user/index';

const router = Router();

router.use(isValidKey);
router.use('/auth', authRoutes);
router.use('/passport', passportRouter);
router.use('/user', userRouter);

export default router;
