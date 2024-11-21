import { Router } from 'express';
import { Container } from 'typedi';

import { AsyncHandler } from '../../../common/utils/AsyncHandler';
import validator, { ValidationSource } from '../../../common/utils/validator';
import { StorageController } from '../../controllers/storage/storage.controller';
import { UploadFile } from '../../middlewares/UploadFile';
import schema from './schema';

const router = Router();
const storageController = Container.get(StorageController);
// const storageController = new UploadsController();

// const authController = new AuthController();

router.post(
  '/single',
  //   [validator(schema.loginEmail)],
  [UploadFile.single('image')],
  AsyncHandler(storageController.uploadFile),
);
router.post(
  '/get-signed-url',
  [validator(schema.fileName, ValidationSource.BODY)],
  AsyncHandler(storageController.getPresignedUrl),
);
export default router;
