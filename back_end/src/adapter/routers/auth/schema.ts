import Joi from 'joi';

import { JoiAuthBearer, JoiObjectId } from '../../../common/utils/validator';

export default {
  loginEmail: Joi.object().keys({
    password: Joi.string().required().min(3).max(500),
    email: Joi.string().required().min(3).max(500),
  }),

  register: Joi.object().keys({
    password: Joi.string().required().min(3).max(500),
    email: Joi.string().required().min(3).max(500),
    username: Joi.string().required().min(3).max(500),
  }),
};
