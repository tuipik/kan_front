import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: () => { },
    setAuth: (state, action) => {
      console.log(state);
      console.log(action);
      state = action.payload;
      console.log(state);
    }
  }
});

export default authSlice.reducer;
export const { logout, setAuth } = authSlice.actions;