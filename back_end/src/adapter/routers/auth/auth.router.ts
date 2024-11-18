import { Router } from 'express';
import { Container } from 'typedi';

import { AsyncHandler } from '../../../common/utils/AsyncHandler';
import validator, { ValidationSource } from '../../../common/utils/validator';
import { AuthController } from '../../controllers/auth/auth.controller';
import verifyToken from '../../middlewares/VerifyToken';
import schema from './schema';

const router = Router();
const authController = Container.get(AuthController);
// const authController = new AuthController();

router.post(
  '/login-email',
  [validator(schema.loginEmail)],
  AsyncHandler(authController.loginEmail),
);
router.post(
  '/register',
  [validator(schema.register)],
  AsyncHandler(authController.register),
);

router.get('/login-google');
export default router;
