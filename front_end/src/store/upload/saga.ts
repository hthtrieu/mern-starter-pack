import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getPresignedUrlApi } from '@/api/uploadApi';
import { EditProfileApi } from '@/api/UserProfile';
import ApiCode from '@/lib/enums/ApiCode';
import { ErrorCode } from '@/lib/enums/ErrorCode';
import { isFunction } from '@/lib/utils';

import { getFileByPath, getPresignedUrl, uploadByPresignedUrl } from './slice';

interface GetPresignedUrlPayload {
  data: {
    name: string;
    fileType?: string;
  };
  onSuccess: any;
  onError: any;
}
function* watchGetPresignedUrl() {
  yield takeLatest(
    getPresignedUrl.type,
    function* ({
      payload,
    }: PayloadAction<GetPresignedUrlPayload>): Generator<any, void, any> {
      const { data, onError, onSuccess } = payload;
      try {
        const res = yield call(getPresignedUrlApi, data);
        if (res.status === ErrorCode.OK) {
          if (res.data.statusCode === ApiCode.SUCCESS) {
            console.log('response signed: ', res.data?.data);
            isFunction(payload.onSuccess) && payload.onSuccess(res.data?.data);
            // yield put(
            //   editUserSuccessAction({
            //     data: res.data?.data,
            //   }),
            // );
          }
        }
      } catch (error: any) {
        isFunction(onError) &&
          onError(error?.response?.data?.message || 'Error');
        // yield put(editUserErrorAction());
      }
    },
  );
}

export default function* uploadSaga() {
  yield all([fork(watchGetPresignedUrl)]);
}
