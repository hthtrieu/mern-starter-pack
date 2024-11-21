import AuthReducer from '@/store/auth/slice';
import PasswordResetReducer from '@/store/forgot-password/slice';
import UserProfileReducer from '@/store/user-profile/slice';

import uploadSlice from './upload/slice';

const rootReducer = {
  Auth: AuthReducer,
  PasswordReset: PasswordResetReducer,
  UserProfile: UserProfileReducer,
  UploadReducer: uploadSlice,
};

export default rootReducer;
