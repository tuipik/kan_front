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
            method: 'GET',
          }
        },
        providesTags: ['Tasks']
      }),
      createTask: builder.mutation({
        query: (data) => {
          return {
            url: 'tasks',
            method: 'POST',
            body: data,
          } 
        },
        invalidatesTags: (result, error) => error ? [] : ['Tasks'],
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
      }),
      deleteTask: builder.mutation({
        query: ( task ) => {
          return {
            url: `tasks/${task.id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: (result, error) => error ? [] : ['Tasks'],
      }),
      createComment: builder.mutation({
        query: (data) => {
          return {
            url: 'comments',
            method: 'POST',
            body: data,
          }
        },
        invalidatesTags: (result, error) => error ? [] : ['Tasks'],
      })
    }
  }
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export { tasksApi };