import { Router } from 'express';
import { Container } from 'typedi';

import { AsyncHandler } from '../../common/helpers/AsyncHandler';
import validator, { ValidationSource } from '../../common/helpers/validator';
import { UserController } from '../../controllers/user/user.controller';
import verifyToken from '../../middlewares/VerifyToken';
import schema from './schema';

const router = Router();
const userController = Container.get(UserController);
// const userController = new UserController();

router.get('/', AsyncHandler(userController.getAllUsers));

//! for test
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
