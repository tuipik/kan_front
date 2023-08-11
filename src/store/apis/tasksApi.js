import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../settings";

const tasksApi = createApi({
  reducerPath: 'tasks',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      let token;
      token = getState().auth.data.tokens.access;
      if (token) {
        const bearerToken = `Bearer ${token}`;
        headers.set('authorization', bearerToken);
      }

      return headers;
    }
  }),
  endpoints(builder) {
    return {
      fetchTasks: builder.query({
        query: () => {
          return {
            url: 'tasks',
            method: 'GET'
          }
        }
      })
    }
  }
});

export const {
  useFetchTasksQuery
} = tasksApi;

export { tasksApi };