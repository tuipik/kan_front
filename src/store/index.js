import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";
import { tasksApi } from "./apis/tasksApi";
import { toastReducer } from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [tasksApi.reducerPath]: tasksApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tasksApi.middleware);
  }
});

setupListeners(store.dispatch);

export {
  useFetchTasksQuery,
  useUpdateTaskMutation,
} from './apis/tasksApi';


export {
  logout,
} from './slices/authSlice';

export {
  showToast,
  hideToast,
} from './slices/toastSlice';

export * from './thunks/login';
