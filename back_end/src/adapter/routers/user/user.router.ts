import { Router } from 'express';
import passport from 'passport';
import { Container } from 'typedi';

import { AsyncHandler } from '../../../common/utils/AsyncHandler';
import validator, { ValidationSource } from '../../../common/utils/validator';
import { UserController } from '../../controllers/user/user.controller';
import verifyToken from '../../middlewares/VerifyToken';
import schema from './schema';

const router = Router();
const userController = Container.get(UserController);
// const userController = new UserController();

router.get('/', AsyncHandler(userController.getAllUsers));
router.post(
  '/update/:id',
  [
    verifyToken,
    validator(schema.userId, ValidationSource.PARAM),
    validator(schema.userUpdate, ValidationSource.BODY),
  ],
  AsyncHandler(userController.updateUser),
);

export default router;
