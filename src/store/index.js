import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";
import { tasksApi } from "./apis/tasksApi";
import { toastReducer } from "./slices/toastSlice";
import { commentsApi } from "./apis/commentsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(commentsApi.middleware)
    ;
  }
});

setupListeners(store.dispatch);

export {
  useFetchTasksQuery,
  useUpdateTaskMutation,
} from './apis/tasksApi';

export {
  useFetchCommentsQuery,
  useCreateCommentMutation,
} from './apis/commentsApi';


export {
  logout,
} from './slices/authSlice';

export {
  showToast,
  hideToast,
} from './slices/toastSlice';

export * from './thunks/login';
