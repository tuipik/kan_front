import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/login";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },
  // reducers: {
  //   logout: () => { },
  //   setAuth: (state, action) => {
  //     console.log(state);
  //     console.log(action);
  //     state = action.payload;
  //     console.log(state);
  //   }
  // },
  extraReducers(builder) {
    // Login
    builder.addCase(loginThunk.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      const ap = action.payload.data.data[0];
      state.data = ap;
    });

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const authReducer = authSlice.reducer;