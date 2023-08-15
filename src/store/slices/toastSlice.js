import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  config: {
    br: 'info',
    header: '',
    body: '',
    delay: 4000,
    bg: 'info',
    autohide: true,
  }
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action) {
      return {
        ...state,
        show: true,
        config: {
          ...state.config,
          ...action.payload,
        }
      }
    },
    hideToast: (state) => initialState,
  }
});

export const toastReducer = toastSlice.reducer;
export const { showToast, hideToast } = toastSlice.actions;
