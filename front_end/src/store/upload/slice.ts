import { createSlice } from '@reduxjs/toolkit';

interface uploadSliceProps {}

const initialState = {
  isLoading: false,
  data: [],
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    getPresignedUrl: (state, action) => {
      state.isLoading = true;
    },

    uploadByPresignedUrl: (state, action) => {
      state.isLoading = false;
    },

    getFileByPath: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getPresignedUrl, uploadByPresignedUrl, getFileByPath } =
  uploadSlice.actions;

export default uploadSlice.reducer;
