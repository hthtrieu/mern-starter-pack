import { createSlice } from '@reduxjs/toolkit';

import { getItem, removeItem, setItem } from '@/lib/LocalStorage';

const initialState = {
  isLoading: false,
  token: getItem('accessToken') || '',
  refresh_token: getItem('refreshToken') || '',
  loggedIn: !!getItem('accessToken'),
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
      state.isLoading = false;
      setItem('access_token', payload.data.accessToken);
      setItem('refresh_token', payload.data.refreshToken);
      state.token = String(payload.data.accessToken);
      state.refresh_token = String(payload.data.refreshToken);
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
      removeItem('accessToken');
      removeItem('refreshToken');
    },
    logoutErrorsAction: (state) => {
      state.loggedIn = false;
      state.isLoading = false;
      removeItem('accessToken');
      removeItem('refreshToken');
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
