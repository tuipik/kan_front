import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../settings";
import { prepareHeaders } from "../../utils";

const tasksApi = createApi({
  reducerPath: 'tasks',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders,
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
          return {
            url: `tasks/${task.id}`,
            method: 'PATCH',
            body: patch
          } 
        },
        invalidatesTags: (result, error) => error ? [] : ['Tasks'],
      })
    }
  }
});

export const {
  useFetchTasksQuery,
  useUpdateTaskMutation,
} = tasksApi;

export { tasksApi };