import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";
import { tasksApi } from "./apis/tasksApi";
import { toastReducer } from "./slices/toastSlice";
import { commentsApi } from "./apis/commentsApi";
import { accountsApi } from "./apis/accountsApi";
import { departmentsApi } from "./apis/departmentsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(commentsApi.middleware)
      .concat(accountsApi.middleware)
      .concat(departmentsApi.middleware)
    ;
  }
});

setupListeners(store.dispatch);

export {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from './apis/tasksApi';

export {
  useFetchCommentsQuery,
  useCreateCommentMutation,
} from './apis/commentsApi';

export {
  useFetchAccountsQuery,
} from './apis/accountsApi';

export {
  useFetchDepartmentsQuery,
} from './apis/departmentsApi'


export {
  logout,
} from './slices/authSlice';

export {
  showToast,
  hideToast,
} from './slices/toastSlice';

export * from './thunks/login';
