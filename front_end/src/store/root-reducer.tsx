import AuthReducer from '@/store/auth/slice';
import PasswordResetReducer from '@/store/forgot-password/slice';
import UserProfileReducer from '@/store/user-profile/slice';


const rootReducer = {
  Auth: AuthReducer,
  PasswordReset: PasswordResetReducer,
  UserProfile: UserProfileReducer,
};

export default rootReducer;
