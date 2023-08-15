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
        },
        providesTags: ['Tasks']
      }),
      updateTask: builder.mutation({
        query: ({ task, ...patch} ) => {
         console.log('task ', task);
         console.log('patch', patch);
         return {
          url: `tasks/${task.id}`,
          method: 'PATCH',
          body: patch
         } 
        },
        invalidatesTags: ['Tasks']
      })
    }
  }
});

export const {
  useFetchTasksQuery,
  useUpdateTaskMutation,
} = tasksApi;

export { tasksApi };