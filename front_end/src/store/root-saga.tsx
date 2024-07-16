import { all } from 'redux-saga/effects';
import AuthSaga from '@/store/auth/saga';
import PasswordResetSaga from '@/store/forgot-password/saga';
import UserProfileSaga from '@/store/user-profile/saga';

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    PasswordResetSaga(),
    UserProfileSaga(),
  ]);
}
