import Joi from 'joi';

import { JoiAuthBearer, JoiObjectId } from '../../../common/utils/validator';

export default {
  fileName: Joi.object().keys({
    name: Joi.string().required(),
    fileType: Joi.string().optional(),
  }),
};
