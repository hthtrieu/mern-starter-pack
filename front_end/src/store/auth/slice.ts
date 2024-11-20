import { createSlice } from '@reduxjs/toolkit';

import Constants from '@/lib/Constants';
import { getItem, removeItem, setItem } from '@/lib/LocalStorage';

interface UserProfileType {
  id: number;
  username: string;
  role: number;
  email?: string;
}
export interface AuthState {
  isLoading: boolean;
  token: string;
  refreshToken: string;
  loggedIn: boolean;
  profile?: UserProfileType | null;
}
const initialState: AuthState = {
  isLoading: false,
  token: getItem(Constants.ACCESS_TOKEN) || '',
  refreshToken: getItem(Constants.REFRESH_TOKEN) || '',
  loggedIn: !!getItem(Constants.ACCESS_TOKEN),
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //eslint-disable-next-line
    loginAction: (state, { payload }) => {
      state.isLoading = true;
      state.loggedIn = false;
    },

    loginActionSuccess: (state, { payload }) => {
      console.log('login google success: ', payload);
      state.isLoading = false;
      setItem(Constants.ACCESS_TOKEN, payload.data.accessToken);
      setItem(Constants.REFRESH_TOKEN, payload.data.refreshToken);
      state.token = String(payload.data.accessToken);
      state.refreshToken = String(payload.data.refreshToken);
      state.loggedIn = true;
    },

    loginActionError: (state) => {
      state.isLoading = false;
      state.loggedIn = false;
    },

    getProfileAction: (state, { payload }) => {
      state.isLoading = true;
    },

    getProfileActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload.data;
    },

    getProfileActionError: (state) => {
      // state.isLoading = false;
      // state.profile = null;
    },

    getAccessTokenByRefreshTokenAction: (state, { payload }) => {
      state.isLoading = true;
      state.profile = payload.data;
    },

    getAccessTokenByRefreshTokenActionSuccess: (state, { payload }) => {},

    registerAction: (state, { payload }) => {
      state.isLoading = true;
    },

    registerActionSuccess: (state, { payload }) => {
      state.isLoading = false;
    },

    registerActionError: (state) => {
      state.isLoading = false;
    },

    loginSuccessWithOauthAction: (state) => {},

    logoutAction: (state, { payload }) => {
      state.loggedIn = true;
      // localStorage.removeItem("access_token");
      // localStorage.removeItem("refresh_token");
    },
    logoutSuccessAction: (state) => {
      state.loggedIn = false;
      state.isLoading = false;
      removeItem(Constants.ACCESS_TOKEN);
      removeItem(Constants.REFRESH_TOKEN);
    },
    logoutErrorsAction: (state) => {
      state.loggedIn = false;
      state.isLoading = false;
      removeItem(Constants.ACCESS_TOKEN);
      removeItem(Constants.REFRESH_TOKEN);
    },
  },
});

export const {
  loginAction,
  loginActionSuccess,
  loginActionError,
  getProfileAction,
  getProfileActionSuccess,
  getProfileActionError,
  getAccessTokenByRefreshTokenAction,
  getAccessTokenByRefreshTokenActionSuccess,
  registerAction,
  registerActionSuccess,
  registerActionError,
  loginSuccessWithOauthAction,
  logoutAction,
  logoutSuccessAction,
  logoutErrorsAction,
} = authSlice.actions;

export default authSlice.reducer;
