import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";
import { tasksApi } from "./apis/tasksApi";
import { toastReducer } from "./slices/toastSlice";
import { accountsApi } from "./apis/accountsApi";
import { departmentsApi } from "./apis/departmentsApi";
import {settingsApi} from "./apis/settingsApi";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [departmentsApi.reducerPath]: departmentsApi.reducer,
  [settingsApi.reducerPath]: settingsApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({serializableCheck: false})
      .concat(tasksApi.middleware)
      .concat(accountsApi.middleware)
      .concat(departmentsApi.middleware)
      .concat(settingsApi.middleware)
    ;
  }
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useFetchCommentsQuery,
  useCreateCommentMutation,
  useDeleteTaskMutation,
} from './apis/tasksApi';

export {
  useFetchAccountsQuery,
} from './apis/accountsApi';

export {
  useFetchDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from './apis/departmentsApi'


export {
  logout,
} from './slices/authSlice';

export {
  showToast,
  hideToast,
} from './slices/toastSlice';

export {
  useFetchSettingsQuery,
} from './apis/settingsApi'

export * from './thunks/login';
