import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
    // .concat(authApi.middleware);
  }
});

setupListeners(store.dispatch);

// export {
//   useLoginMutation
// } from './apis/authApi';

export * from './thunks/login';

// export { setAuth, logout } from './slices/authSlice';