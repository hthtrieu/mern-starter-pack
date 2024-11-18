import Joi from 'joi';

import { JoiAuthBearer, JoiObjectId } from '../../../common/utils/validator';

export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  userUpdate: Joi.object().keys({
    name: Joi.string().required().min(3).max(500),
    email: Joi.string().optional().min(3).max(2000),
  }),

  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
};
