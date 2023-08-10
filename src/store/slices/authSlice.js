import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/login";

const initialState = {
  data: {},
  isLoading: false,
  isAuthenticated: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: ({ state }) => {
      console.log('in logout');
      return initialState;
    }
  },
  extraReducers(builder) {
    // Login
    builder.addCase(loginThunk.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const ap = action.payload.data.data[0];
      state.data = ap;
      state.isLoading = false;
      state.isAuthenticated = true;
    });

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;